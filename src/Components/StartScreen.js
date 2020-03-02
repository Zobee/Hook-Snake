import React from 'react'

function StartScreen({startGame}) {
    return (
        <div className='start'>
            <h1>Hangry Snake</h1>
            <h3>Help Dupresne the Snake fill his stomach. Watch out, he's looking pretty hangry.</h3>
            <h1>Instructions</h1>
            <h3>WASD - To move <br/>Eat all the red pellets. It's snake, i'm sure you've had experience in this department.</h3>
            <button className='startButton' onClick={()=>startGame()}>Start Game</button>
        </div>
    )
}

export default StartScreen
