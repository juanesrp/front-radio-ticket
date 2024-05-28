"use client"
import React, { useEffect, useRef, useState } from 'react'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const toggleSearch = () => {
    setIsVisible(!isVisible)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isVisible || isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isVisible, isOpen]);

  return (
    <>
      <div className='bg-black '>
        <div className='text-white text-lg flex justify-between items-center p-7 max-w-7xl mx-auto sm:border-b border-[#374151]'>
          <div className='min-[769px]:hidden' onClick={toggleModal}>
            menu
          </div>
          <div>
            <img src="/logo2.png" alt="radioticket" className="h-28 "/>
          </div>
          <div className='flex gap-1 items-center'>
            {
              isVisible ? (
                <div ref={searchRef}>
                 <input type='search' className='bg-[#3b3b3bd5] text-white max-[768px]:hidden rounded'/> 
                </div>         
            ) : <button onClick={toggleSearch} className='max-[768px]:hidden'>buscar</button>
            }
            
            carrito
          </div>
        </div>
        <div className='text-[#ffffff9b] pr-5 pl-2 flex justify-between max-w-7xl mx-auto max-[768px]:hidden'>
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

      <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-50 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div  ref={sidebarRef} className={`w-64 h-screen bg-[#1f1c1cfa] p-4 flex flex-col gap-2 items-center transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <input type="search" className='bg-[#3b3b3bd5] text-white rounded'/>
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

