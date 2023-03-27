import React, { useEffect, useState } from 'react'
// import ReactJSON from 'react-json-view'

const State = ({ formState }) => {
  // const [state, setState] = useState(formState)

  // useEffect(() => {
  //   let frame
  //   const looper = () => {
  //     console.log(formState === state)
  //     const newState = formState
  //     if (newState !== state) {
  //       setState(newState)
  //     }
  //     frame = requestAnimationFrame(looper)
  //   }
  //   frame = requestAnimationFrame(looper)

  //   return () => {
  //     cancelAnimationFrame(frame)
  //   }
  // }, [])
  return (
    <div className="state">
      <h3>State</h3>

      <pre>
        <code>
          {JSON.stringify(formState, null, 2)}
          {/* <ReactJSON theme="monokai" src={state} /> */}
        </code>
      </pre>
    </div>
  )
}

export default State
