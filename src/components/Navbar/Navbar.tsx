"use client"
import React, { useState } from 'react'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const toggleSearch = () => {
    setIsVisible(!isVisible)
  }

  return (
    <>
      <div className='bg-black'>
        <div className='text-white text-lg flex justify-between p-7 lg:mx-8 xl:mx-40 '>
          <div className='sm:hidden' onClick={toggleModal}>
            menu
          </div>
          <div>
            Logo
          </div>
          <div className='flex gap-1'>
            {
              isVisible
            }
            <input type='search' className='bg-[#3b3b3bd5] text-white max-[450px]:hidden' />
            carrito
          </div>
        </div>
        <div className='sm:border-b border-[#a2a2a2c4]' />

        <div className='text-[#ffffff9b] pr-5 pl-2 flex justify-between lg:mx-8 xl:mx-40 max-[450px]:hidden'>
          <div className='py-8 text-lg'>
            <span className='p-5 hover:text-white transition duration-300'>INICIO</span>
            <span className='p-5 hover:text-white transition duration-300'>PROXIMOS EVENTOS</span>
            <span className='p-5 hover:text-white transition duration-300'>ACERCA DE LA PAGINA</span>
            <span className='p-5 hover:text-white transition duration-300'>CONTACTO</span>
          </div>
          <div className='py-8 text-xs'>
            <span className='hover:text-white transition duration-300'>CUENTA</span>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`w-64 h-screen bg-[#1f1c1cfa] p-4 flex flex-col gap-2 items-center transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <input type="search" className='bg-[#3b3b3bd5] text-white' />
          <div className='flex flex-col gap-4 items-center text-[#ffffff9b] text-lg'>
            <span className='hover:text-white transition duration-300'>INICIO</span>
            <span className='hover:text-white transition duration-300'>PROXIMOS EVENTOS</span>
            <span className='hover:text-white transition duration-300'>ACERCA DE LA PAGINA</span>
            <span className='hover:text-white transition duration-300'>CONTACTO</span>
            <span className='hover:text-white transition duration-300'>CUENTA</span>
          </div>
          <button onClick={toggleModal} className="mt-4 bg-[#d8232f] text-white p-2 rounded">
            Cerrar
          </button>
        </div>
      </div>
    </>
  )
}

