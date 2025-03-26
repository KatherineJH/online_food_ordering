import { Button, Card } from '@mui/material'
import React from 'react'

const OrderCard = () => {
  return (
    <Card className='flex justify-between items-center p-5'>
        <div className='flex items-center space-x-5'>
            <img className='h-16 w-16' src="https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        </div>
        <div>
            <p>Pizza</p>
            <p>₩13000</p>
        </div>
        <div>
            <Button className='cursor-not-allowed'>Completed</Button>
        </div>
    </Card>
  )
}

export default OrderCard