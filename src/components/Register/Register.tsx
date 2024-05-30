'use client'
import { validateRegisterForms } from "@/helpers/validateForms";
import { RegisterErrorProps, RegisterProps } from "@/interfaces/register";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";


const Register: React.FC = () => {
    const router = useRouter();
    const initialdata = {
        name: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [dataUser, setDataUser] = useState<RegisterProps>(initialdata);
    const [errorUser, setErrorUser] = useState<RegisterErrorProps>(initialdata);
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log('handleSubmit', event.target);
        event.preventDefault();

        const errors = validateRegisterForms(dataUser)
        if (errors.name !== ""
            || errors.lastName !== ""
            || errors.phone !== ""
            || errors.email !== ""
            || errors.password !== ""
            || errors.confirmPassword !== ""
        ) {
            console.log({ errors });
            setErrorUser(errors)
            return false;
        }
        try {
            const res = await axios.post('http://localhost:3001/auth/signup', dataUser, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.status === 201) {
                alert("El usuario se ha registrado exitosamente");
                setDataUser(initialdata);
                router.push("/login");
            } else {
                const parsedResponse = await res.data;
                alert(parsedResponse.message);
            }
        } catch (error: any) {
            console.error("Error:", error);
            throw new Error(error);
        }
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setDataUser({
            ...dataUser,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-white mt-20 mb-20">
            <form onSubmit={handleSubmit}
                className="max-w-2xl w-full px-12 py-14 bg-gray-100 rounded-lg shadow-md">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">CREAR CUENTA</h1>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2 text-xl">
                        Nombre
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={dataUser.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2 text-xl">
                        Apellidos
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={dataUser.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2 text-xl">
                        Teléfono
                    </label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={dataUser.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2 text-xl">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={dataUser.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2 text-xl">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={dataUser.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <p className="mb-3 mt-0 text-sm text-gray-600"> La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial (!@#$%^&*), y tener entre 8 y 15 caracteres de longitud.</p>
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2 text-xl">
                        Confirmar contraseña
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={dataUser.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="w-80 py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-200 text-xl">
                        CREAR
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
