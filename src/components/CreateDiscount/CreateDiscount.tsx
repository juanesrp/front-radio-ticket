import { IEvent } from '@/interfaces'
import React from 'react'

const CreateDiscount = ({ event }: { event: IEvent }) => {
    
  return (
    <>
    <h1>{event.name}</h1>
    </>
  )
}

export default CreateDiscount