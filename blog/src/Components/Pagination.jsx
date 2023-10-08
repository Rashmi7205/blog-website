import React from 'react'

function Pagination({onclick}) {
  return (
    <div>
        <button onClick={onclick}>prev</button>
        <button onClick={onclick}>next</button>
    </div>
  )
}

export default Pagination