'use client'

import React from 'react'
import CountUp from 'react-countup'

export default function CountUpBox( 
  {amount} : {amount: number}
) {
  return (
    <div>
      <CountUp 
        end={amount}
        duration={2}  
        decimal=","
        prefix='$'
        />
    </div>
  )
}
