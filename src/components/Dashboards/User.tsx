"use client"
import { UserData } from '@/interfaces/userData';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const User = () => {
    const [authUser, setAuthUser] = useState<UserData | null>(null);

    useEffect(() => {
        const userSessionString = localStorage.getItem('userSession');
        const userSession = userSessionString ? JSON.parse(userSessionString) : null;
        if (userSession) {
            setAuthUser(userSession)
        } 
    }, [])

  return (
    <>
    {authUser && authUser.isSuperAdmin ? (
                <div className='flex gap-3'>
                    <Link href={"/dashAdmi"} className='bg-red-600 hover:bg-red-700 p-2 text-white'>Perfil de admin</Link>
                    <Link href={"/dashSuperAdmin"} className='bg-red-600 hover:bg-red-700 p-2 text-white'>Perfil de Super admin</Link>
                </div>
            ) : ""}
    <div className='max-w-6xl mx-auto pb-10 px-5'>
            <h1 className='text-5xl pt-10 pb-4'>Mi Cuenta</h1>
            
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 px-5 pt-3'>
                <div className='md:col-span-2  bg-gray-100 p-8 rounded'>
                    <h2 className='text-2xl font-bold mb-2'>Historial de compras</h2>
                    <span>no haz realizado compras todavía</span>
                </div>
                <div className='bg-gray-100 p-8 rounded'>
                    <h2 className='font-bold'>Detalles de la cuenta</h2>
                </div>
            </div>
        </div>
      </>  
  )
}

export default User
