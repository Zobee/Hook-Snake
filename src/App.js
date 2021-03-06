import React, {useState, useEffect, useCallback} from 'react';
import StartScreen from './Components/StartScreen'
import Snake from './Components/Snake'
import Pellet from './Components/Pellet'
import GameOver from './Components/GameOver'

import './App.css';

const rando = () => {
  return (Math.floor((Math.random() * 49) + 1) * 2)
}

const getRandoCoords = () => {
  let x = rando(), y = rando()
  return [x, y]
}


const App = () => {
  const [isStart, setIsStart] = useState(false)
  const [direction, setDirection] = useState('D')
  const [segs, setSegs] = useState([[0,0],[2,0]])
  const [food, setFood] = useState(getRandoCoords())
  const [speed, setSpeed] = useState(250)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [tick, setTick] = useState(0)
  const [isMad, setIsMad] = useState(false)

  //Whenever a key is pressed, the keyPress function will run. A re-render will be triggered
  //if the direction variable changes
  const keyPress = useCallback((e) => {
  let key = e.key.toUpperCase()

  setDirection(
    (dir) => {
      //Only sets direction if the opposite direction is the current state (to avoid insta-death)
      switch(key){
        case 'W' : return dir === 'S' ? 'S' : 'W'
        case 'S' : return dir === 'W' ? 'W' : 'S'
        case 'A' : return dir === 'D' ? 'D' : 'A'
        case 'D' : return dir === 'A' ? 'A' : 'D'
      } 
    }
  )
  
}, [])

  useEffect(() => {
    
    document.addEventListener('keydown', keyPress)
    const inter = setInterval(()=>move(), speed)

    //Since the collision check needs to be run every time setInterval is run. I can set it here
    //maybe? Could call in the move function instead.
    collision()
    cannibalize()

    //removes the listener and clears the interval after each render
    //This has similar functionality to the componentDidUnmount lifecycle method.
    return () => {
      document.removeEventListener('keydown',keyPress)
      clearInterval(inter)
  }

  }, [keyPress, segs])

  useEffect(()=>{
    eat()

  },[food,segs])

  useEffect(()=>{
    speedUp()
  },[isMad])

  //Maybe just integrate this into the reset func
  const startGame = () => {
    setIsStart(true)
    setDirection('D')
  }

  const move = () => {
    let snek = [...segs]
    let head = snek[snek.length - 1]
  
    switch (direction){
      case 'D':
        head = [head[0] + 2, head[1]]
        break;
      case 'S':
        head = [head[0], head[1] + 2]
        break;
      case 'A':
        head = [head[0] - 2, head[1]]
        break;
      case 'W':
        head = [head[0], head[1] -2]
        break;
    }
    snek.push(head)
    snek.shift()
    setSegs(snek)
  }

  //Collision for the screen borders
  const collision = () => {
    if (segs[segs.length -1][0] >= 100 || segs[segs.length -1][1] >= 100 || segs[segs.length -1][0] < 0 || segs[segs.length -1][1] < 0){
      setGameOver(true)
    }
  }
  //Collision for the snake's body segments 
  const cannibalize = () => {
    let body = [...segs]
    let head = body.pop()
    return (body.filter(seg => seg[0] === head[0] && seg[1] === head[1]).length === 1 ? setGameOver(true) : null)
  }
  //When a pellet is eaten, the snake grows a segment, and a new food pellet is generated
  //Also checks how long it's been since a pellet was last eaten by calling hangry()
  const eat = () => {
    let head = segs[segs.length - 1]
    let foodLocation = food

    if (head[0] === foodLocation[0] && head[1] === foodLocation[1]){
      setFood(getRandoCoords())
      getBig()
      setSpeed(speed => speed > 30 ? speed - 10 : speed)
      setScore(score + 100)
      setTick(0)
    } else {
      setTick(tick +1)

    }
    hangry()
  }
  //Sets the state of hangry if the tick count is over a certain threshold (increase based on the current length of the snake)
  const hangry = () => {
    return tick > (5 * segs.length) ? setIsMad(true) : tick === 0 ? setIsMad(false) : null
  }
  //Function used to double the speed when the snake is in hangry mode, and sets it to normal when out of hangry mode
  const speedUp = () => {
    isMad ? setSpeed(speed/2) : score === 0 ? setSpeed(speed) : setSpeed(score >= 2400 ? 20 : 250 - (score/10))
  }
  //Adds a segment to the BEGINNING of the snake, and updatees the state of segs to illustrate this
  const getBig = () => {
    let snek = [...segs]
    snek.unshift([])
    setSegs(snek)
  }
  //Resets the game
  const reset = () => {
      setSegs([[0,0],[2,0]])
      setScore(0)
      setSpeed(250)
      setGameOver(false)
      setDirection('D')
      setTick(0)
  }
  //This here uses a bit of conditional rendering to toggle between game components depending on
  //the game's current state
  return (
    <div>
      <div className="game-board">
      {isStart ?
      !gameOver ? 
      <div>
        <Snake isMad={isMad} segs={segs}/>
        <Pellet food={food}/>
      </div>
      : 
        <GameOver score={score} reset={reset}/>
      : 
      <StartScreen startGame={startGame}/>
    }

    </div>
    </div>



  );
}

export default App;
