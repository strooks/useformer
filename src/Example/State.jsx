import React, { useEffect, useState } from 'react'

const State = ({ formState }) => {
  const [state, setState] = useState(formState())

  useEffect(() => {
    let frame
    const looper = () => {
      const newState = formState()
      if (newState !== state) {
        setState(newState)
      }
      frame = requestAnimationFrame(looper)
    }
    frame = requestAnimationFrame(looper)

    return () => {
      cancelAnimationFrame(frame)
    }
  }, [])
  return (
    <div className="state">
      <h3>State</h3>
      <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>
    </div>
  )
}

export default State
