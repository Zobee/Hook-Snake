import React from 'react'

function Snake({segs}) {

    return (
        <div>
            {segs.map((dot, i) => {
                const style = {
                    left : `${dot[0]}%`,
                    top : `${dot[1]}%`
                }
                return (
                    <div className='snake-segment' key={i} style={style}></div>
                )
            })}
        </div>
    )
}

export default Snake
