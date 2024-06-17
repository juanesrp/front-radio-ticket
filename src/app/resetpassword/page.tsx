'use client'
import Link from 'next/link';
import React, { useState } from 'react';

const ResetPassword = () => {
    const [dataUser, setDataUser] = useState({
        email: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDataUser({
            ...dataUser,
            [event.target.name]: event.target.value,
        });
        console.log(`Input ${event.target.name} changed:`, event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className="flex justify-center items-center bg-white py-10 mt-20">
            <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-lg mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">RESTABLECER SU CONTRASEÑA</h1>
                <p className="text-center mb-8 text-xl">Le enviaremos un correo electrónico para restablecer su contraseña.</p>
                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="mb-4">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={dataUser.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-80 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            ENVIAR
                        </button>
                    </div>
                </form>
                <button className="text-gray-600 hover:text-gray-800 focus:outline-none block mx-auto">
                    <Link href="/login" className='hover:underline'>
                        Cancelar
                    </Link>
                </button>
            </div>
        </div>
    );
};
export default ResetPassword;