import React from 'react'

function GameOver({score, reset}) {
    return (
        <div>
            GAME OVER
            <br/>
            SCORE : {score}
            <br/>
            <button onClick={()=>reset()}>Play Again?</button>
        </div>
    )
}

export default GameOver
