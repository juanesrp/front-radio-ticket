import React from 'react'

const FormNewEvent = () => {
  return (
    <>
    <div className='flex flex-col items-center my-12'>
       <form className='max-w-md w-full flex flex-col bg-gray-100 px-6 py-8 rounded-md shadow-md'>

        <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>Crear nuevo evento</h2>

        <div className='flex flex-col'>
         <label htmlFor="" className='text-gray-600 my-2'>Nombre del evento</label>
        <input type="text" className='rounded-md'/>   
        </div>

        <div className='flex flex-col'>
            <label htmlFor="" className='text-gray-600 my-2'>Fecha del evento</label>
            <input type="text" className='rounded-md'/>
        </div>

        <div className='flex flex-col'>
            <label htmlFor="" className='text-gray-600 my-2'>Lugar del evento</label>
            <input type="text" className='rounded-md'/>
        </div>

        <div className='flex flex-col'>
            <label htmlFor="" className='text-gray-600 my-2'>Locacion</label>
            <select name="" id="" className='rounded-md'>
                <option>General</option>
                <option>VIP</option>
            </select>
        </div>

        <div className='flex flex-col'> 
            <label htmlFor="" className='text-gray-600 my-2'>Precio de la entrada</label>
            <input type="text" className='rounded-md'/>
        </div>

        <div className='flex flex-col'>
            <label htmlFor="" className='text-gray-600 my-2'>Poster del evento</label>
            <input type="text" className='rounded-md'/>
        </div>

        <div className='flex flex-col'>
            <label htmlFor="" className='text-gray-600 my-2'>Describcion del evnto</label>
            <input type="text" className='rounded-md'/>
        </div>
        
        <input type="submit" value="Enviar" className='bg-red-500 text-white font-semibold py-2 mt-4 rounded-md hover:bg-red-600 transition duration-200 cursor-pointer'/>

       </form> 
    </div>
    </>
  )
}

export default FormNewEvent