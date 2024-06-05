"use client"
import { User } from '@/interfaces/user';
import { UserData } from '@/interfaces/userData';
import { getUsers, putUser } from '@/utils/users.util';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react'

function SuperAdmin() {
    const [authUser, setAuthUser] = useState<UserData | null>(null);
    const [users, setUsers] = useState<User[]>([]);
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
                    const res = await getUsers(1, 5)
                    setUsers(res);
                } catch (error) {
                    console.error("Error al obtener usuarios:", error);
                }
            }
        }
        fetchData()
    }, [router])

    const toggleAdminStatus = async (id: string, isAdmin: boolean) => {
        const res = await putUser(id, isAdmin);
        if (res.status !== 200) {
            alert("Error al cambiar el estado de administrador del usuario");
        }
        if (res.data !== null && res.data.isAdmin !== undefined) {
            const updatedUsers = users.map(user => {
                if (user.id === id) {
                    return { ...user, isAdmin: !!res.data?.isAdmin };
                }
                return user;
            });
            setUsers(updatedUsers);
        }
    }
    
    

    return (
        <>
            <div className='flex gap-3'>
                <Link href={"/dashMyUser"} className='bg-red-600 hover:bg-red-700 p-2 text-white'>Perfil de usuario</Link>
                <Link href={"/dashAdmi"} className='bg-red-600 hover:bg-red-700 p-2 text-white'>Perfil de administrador</Link>
            </div>

            <h2>Lista de usuarios:</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        <p>{user.id}</p>
                        <p>Nombre: {`${user.name} ${user.lastName}`}</p>
                        <p>Email: {user.email}</p>
                        <p>Administrador: {user.isAdmin ? 'Sí' : 'No'}</p>
                        <button className='bg-red-600 hover:bg-red-700 transition duration-300 
                        p-2 text-white rounded-md'
                        onClick={() => toggleAdminStatus(user.id, !user.isAdmin)}>Cambiar el rol</button>
                    </li>
                ))}
            </ul>

        </>
    )
}

export default SuperAdmin