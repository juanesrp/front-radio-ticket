

const Register: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="max-w-2xl w-full px-12 py-14 bg-gray-100 rounded-lg shadow-md">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">CREAR CUENTA</h1>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2 text-xl">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2 text-xl">
                        Apellidos
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2 text-xl">
                        Teléfono
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2 text-xl">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2 text-xl">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-center">
                    <button className="w-80 py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-200 text-xl">
                        CREAR
                    </button>
                </div>
            </div>
        </div>
    );

};
export default Register;
