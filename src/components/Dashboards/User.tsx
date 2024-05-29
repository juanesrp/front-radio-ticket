import React from 'react'

const User = () => {
  return (
    <div className='max-w-6xl mx-auto pb-10 px-5'>
            <h1 className='text-5xl pt-10 pb-4'>Mi Cuenta</h1>
            
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 px-5 pt-3'>
                <div className='md:col-span-2  bg-[#d5d1d165] p-8 rounded'>
                    <h2 className='text-2xl font-bold mb-2'>Historial de compras</h2>
                    <span>no haz realizado compras todavía</span>
                </div>
                <div className='bg-[#d5d1d165] p-8 rounded'>
                    <h2 className='font-bold'>Detalles de la cuenta</h2>
                </div>
            </div>
        </div>
  )
}

export default User
