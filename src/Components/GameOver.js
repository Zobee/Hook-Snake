import React from 'react'

function GameOver({score, reset}) {
    return (
        <div className='gameOver'>
            <h1>GAME OVER</h1>
            <br/>
            <h3>SCORE : {score}</h3>
            <br/>
            <button onClick={()=>reset()}>Play Again?</button>
        </div>
    )
}

export default GameOver
