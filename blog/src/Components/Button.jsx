import React from 'react'

function Button({text,onclick}) {
  return (
        <button className='btn' onClick={onclick}>
            {text}
        </button>
  )
}

export default Button;