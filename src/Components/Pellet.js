import React from 'react'

function Pellet({food}) {
    const style = {
        left : `${food[0]}%`,
        top : `${food[1]}%`
    }
    return (
        <div className='pellet' style={style}></div>
    )
}

export default Pellet
