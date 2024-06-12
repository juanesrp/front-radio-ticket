/* eslint-disable @next/next/no-img-element */
"use client"
import { IEvent } from '@/interfaces';
import { User } from '@/interfaces/user';
import { UserData } from '@/interfaces/userData';
import { getEvents } from '@/utils/events.util';
import { formatDate } from '@/utils/formatDate';
import { getUsers, putUser } from '@/utils/users.util';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react'

function SuperAdmin() {
    const [authUser, setAuthUser] = useState<UserData | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [showEvents, setShowEvents] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const eventsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalEventsFetched, setTotalEventsFetched] = useState(false);
    const router = useRouter();


    useEffect(() => {
        const fetchData = async () => {
            const userSessionString = localStorage.getItem('userSession');
            const userSession = userSessionString ? JSON.parse(userSessionString) : null;
            if (userSession && !userSession.isSuperAdmin) {
                router.push("/");
            } else {
                setAuthUser(userSession);
                try {
                    const res = await getUsers(1, 3)
                    if (Array.isArray(res)) {
                        setUsers(res);
                    } else if ('error' in res) {
                        if (res.error === "Invalid token") {
                            alert("El token es inválido. Vuelve a iniciar sesión.");
                            localStorage.removeItem("userSession");
                            localStorage.removeItem("cart");
                            window.location.href = "/login";
                        }
                    } else {
                        console.error("La respuesta de getUsers no es un array:", res);
                    }
                } catch (error) {
                    console.error("Error al obtener usuarios:", error);
                }
                try {
                    const eventsData = await getEvents(1, 5);
                    if ('error' in eventsData) {
                        if (eventsData.error === "Invalid token") {
                            console.log("Token invalido")
                        }
                    } else {
                        setEvents(eventsData);
                    }
                } catch (error) {
                    console.error("Error al obtener eventos:", error);
                }
            }
        }
        fetchData()
    }, [router])

    const toggleAdminStatus = async (id: string, isAdmin: boolean) => {
        const confirmation = confirm(`¿Estás seguro de que quieres ${isAdmin ? 'activar' : 'desactivar'} el rol de administrador para este usuario?`);

        if (!confirmation) {
            return; 
        }

        const res = await putUser(id, isAdmin);
        if (res.status !== 200) {
            alert("Error al cambiar el estado de administrador del usuario");
            return;
        }
        if (res.data !== null && res.data.isAdmin !== undefined) {
            const updatedUsers = users.map(user => {
                if (user.id === id) {
                    return { ...user, isAdmin: !!res.data?.isAdmin };
                }
                return user;
            });
            setUsers(updatedUsers);
            alert(`El estado de administrador ha sido ${isAdmin ? 'activado' : 'desactivado'}`);
        }
    }

    useEffect(() => {
        fetchEvents(currentPage);
    }, [currentPage]);

    const fetchEvents = async (page: number) => {
        try {
            const eventsData = await getEvents(page, eventsPerPage);
            if ('error' in eventsData) {
                if (eventsData.error === "Invalid token") {
                    console.log("Token invalido")
                }
            } else {
                setEvents(eventsData);
                setTotalEventsFetched(eventsData.length < eventsPerPage);
            }
        } catch (error) {
            console.error("Error al obtener eventos:", error);
        }
    }

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber > 0) {
            setCurrentPage(pageNumber);
        }
    }


    return (
        <>
            <div className='max-w-6xl mx-auto pb-10 px-5'>
                <h1 className='text-5xl pt-10 pb-4'>Mi Cuenta</h1>
                <div className='pl-5'>
                    <Link href={"/dashAdmi/newEvent"}><button className='bg-red-600 hover:bg-red-700 transition duration-300  p-2 text-2xl text-white'>Crear evento</button></Link>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-5 px-5 pt-3'>
                    <div className='md:col-span-2 shadow bg-gray-100 p-8 '>
                        <div className='flex justify-between border-b-2 pb-2'>
                            <h2 className='text-2xl font-bold'>Historial de eventos</h2>
                            <button
                                onClick={() => setShowEvents(!showEvents)}>
                                {showEvents ? (<img src='/arrow-up.svg' alt='ocultar' className='h-10' />) : (<img src='/arrow-down.svg' alt='mostrar' className='h-10' />)}
                            </button>
                        </div>

                        {showEvents && (
                            events && events.length === 0 ? (
                                <span>No has realizado eventos todavía</span>
                            ) : (
                                <>
                                    <ul>
                                        {events && events.map(event => (
                                            <li key={event.id} className='p-2'>
                                                <div className='p-3 border-b-2 md:flex-row justify-between items-center flex flex-col font-bold gap-3'>
                                                    <img src={event.imgUrl} alt={event.name} className='md:w-[30%] w-[70%] ' />
                                                    <div className='flex flex-col justify-center p-5 items-center lg:mr-10'>
                                                        <p>{event.name.toLocaleUpperCase()}</p>
                                                        <p>{formatDate(event.date)}</p>
                                                        <p>{event.userEmail}</p>
                                                        <Link href={`/dashSuperAdmin/${event.id}`}><button className='bg-red-600 hover:bg-red-700 transition duration-300  p-2 w-32 text-base text-white'>Ver detalle</button></Link>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex justify-center my-4">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="mr-2 px-4 py-2 bg-gray-200  hover:scale-105 transition-transform"
                                        >
                                            Página Anterior
                                        </button>
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={totalEventsFetched}
                                            className="ml-2 px-4 py-2 bg-gray-200  hover:scale-105 transition-transform"
                                        >
                                            Página Siguiente
                                        </button>
                                    </div>
                                </>
                            )
                        )}
                        <div className='flex justify-between mt-3'>
                            <h2 className='text-2xl font-bold'>Lista de usuarios</h2>
                            <button
                                onClick={() => setShowUsers(!showUsers)}>
                                {showUsers ? (<img src='/arrow-up.svg' alt='ocultar' className='h-10' />) : (<img src='/arrow-down.svg' alt='mostrar' className='h-10' />)}
                            </button>
                        </div>

                        {showUsers && (
                            <ul>
                                {Array.isArray(users) && users.map((user, index) => (
                                    <li key={index}>
                                        <div className='flex md:flex-row md:justify-between flex-col max-[768px]:items-center border-b-2 mb-5'>
                                            <div>
                                                <div className='max-[768px]:flex max-[768px]:flex-col max-[768px]:items-center'>
                                                    <span className='font-bold'>Nombre</span>
                                                    <p> {`${user.name} ${user.lastName}`}</p>
                                                </div>
                                                <div className='max-[768px]:flex max-[768px]:flex-col max-[768px]:items-center'>
                                                    <span className='font-bold'>Email</span>
                                                    <p> {user.email}</p>
                                                </div>
                                            </div>
                                            <div className='mb-3'>
                                                <div>
                                                    <span className='font-bold'>Administrador</span>
                                                    <p className='text-center'> {user.isAdmin ? 'Sí' : 'No'}</p>
                                                </div>

                                                <button className='bg-red-600 hover:bg-red-700 transition duration-300 p-1 text-white'
                                                    onClick={() => toggleAdminStatus(user.id, !user.isAdmin)}>Cambiar el rol</button>
                                            </div>

                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className='md:col-span-1 bg-gray-100 p-8 shadow break-words self-start'>
                        <h2 className='font-bold'>Detalles de la cuenta</h2>
                        <p>{authUser?.name}</p>
                        <p>{authUser?.email}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SuperAdmin