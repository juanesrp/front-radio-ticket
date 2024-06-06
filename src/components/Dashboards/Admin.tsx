"use client"
import { IEvent } from '@/interfaces';
import { UserData } from '@/interfaces/userData';
import { getEventsOfAdmin } from '@/utils/events.util';
import { formatDate } from '@/utils/formatDate';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';

const Admin = () => {
    const [authUser, setAuthUser] = useState<UserData | null>(null);
    const [events, setEvents] = useState<IEvent[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const userSessionString = localStorage.getItem('userSession');
            const userSession = userSessionString ? JSON.parse(userSessionString) : null;
            if (userSession && !userSession.isAdmin && !userSession.isSuperAdmin) {
                router.push("/");
            } else {
                setAuthUser(userSession);
                try {
                    const eventsData = await getEventsOfAdmin();
                    if ('error' in eventsData) {
                        if (eventsData.error === "Invalid token") {
                            alert("El token es inválido. Vuelve a iniciar sesión.");
                            localStorage.removeItem("userSession");
                            window.location.href = "/login";
                        } 
                    } else {
                        setEvents(eventsData);
                    }
                } catch (error) {
                    console.error("Error al obtener eventos:", error);
                }
            }
        };

        fetchUserData();
    }, [router]);
    console.log();
    
    return (
        <>

            <div className='max-w-6xl mx-auto pb-10 px-5'>
                <h1 className='text-5xl pt-10 pb-4'>Mi Cuenta</h1>
                <div className='pl-5'>
                    <Link href={"/dashAdmi/newEvent"}><button className='bg-red-600 hover:bg-red-700 transition duration-300 rounded p-2 text-2xl text-white'>Crear evento</button></Link>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5 px-5 pt-3'>
                    <div className='md:col-span-2  bg-gray-100 p-8 rounded'>
                        <h2 className='text-2xl font-bold mb-2'>Historial de eventos</h2>
                        {events && events.length === 0 ? (
                            <span>No has realizado eventos todavía</span>
                        ) : (
                            <ul>
                                {events && events.map(event => (
                                    <li key={event.id} className='p-2'>
                                        <div className='bg-white p-3 shadow-md rounded-md md:flex-row justify-between items-center flex flex-col font-bold gap-3'>
                                            <div className='flex flex-col justify-center p-5 bg-gray-100 rounded-md shadow items-center lg:ml-10'>
                                                <p>{event.name.toLocaleUpperCase()}</p>
                                                <p>{formatDate(event.date)}</p>
                                                <Link href={`/dashAdmi/${event.id}`}><button className='bg-red-600 hover:bg-red-700 transition duration-300 rounded p-2 w-32 text-base text-white'>Ver detalle</button></Link>
                                            </div>
                                               <img src={event.imgUrl} alt={event.name} className='md:w-[40%] w-[70%] rounded-md '/>                                         
                                        </div> 
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className='md:col-span-1 bg-gray-100 p-8 rounded break-words self-start'>
                        <h2 className='font-bold'>Detalles de la cuenta</h2>
                        <p>{authUser?.name}</p>
                        <p>{authUser?.email}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin
