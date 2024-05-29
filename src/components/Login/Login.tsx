import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">INGRESAR</h1>
        <p className="text-gray-600 mb-2">Correo electrónico</p>
        <input
          type="email"
          placeholder="example@gmail.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <p className="text-gray-600 mb-2">Contraseña</p>
        <input
          type="password"
          placeholder="xxxxxxxxxxx"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button className="w-full py-2 mt-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300">
          INICIAR SESIÓN
        </button>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>
        <button className="w-full py-2 mb-4 bg-white text-gray-600 font-semibold rounded-md border border-gray-300 hover:bg-gray-100 transition duration-200 flex items-center justify-center">
          <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
              clipRule="evenodd"
            />
          </svg>
          Continuar con Google
        </button>
        <p className="mt-4 text-center text-gray-600">
          ¿Olvidó su contraseña?{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Crear cuenta
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;