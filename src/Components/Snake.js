import React from 'react'

function Snake({segs, isMad}) {
    let color = isMad ? 'red' : 'green'
    return (
        <div>
            {segs.map((dot, i) => {
                const style = {
                    left : `${dot[0]}%`,
                    top : `${dot[1]}%`,
                    backgroundColor : `${color}`
                }
                return (
                    <div className='snake-segment' key={i} style={style}></div>
                )
            })}
        </div>
    )
}

export default Snake
