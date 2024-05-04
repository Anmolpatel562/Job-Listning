import React from 'react'
import spinner from './resources/spinner.gif'

export default function Spinner() {
  return (
    <div>
      <img style={{width:"80px",height:"80px"
      }} src={spinner} alt="" />
    </div>
  )
}
