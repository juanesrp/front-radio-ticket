"use client";
import { LoginErrorProps, LoginProps } from "@/interfaces/login";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { validateLoginForms } from "@/helpers/validateForms";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { BiCheck, BiError } from "react-icons/bi";
import { toast } from "sonner";
const api = process.env.NEXT_PUBLIC_API;

const Login: React.FC = () => {
  const router = useRouter();
  const jwt = require("jsonwebtoken");
  const loginData = {
    email: "",
    password: "",
  };

  const handleRedirect = () => {
    window.location.href = "/api/auth/login?connection=googlex";
  }
  const [dataUser, setDataUser] = useState<LoginProps>(loginData);
  const [errorUser, setErrorUser] = useState<LoginErrorProps>(loginData);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataUser({
      ...dataUser,
      [event.target.name]: event.target.value,
    });
    console.log(`Input ${event.target.name} changed:`, event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateLoginForms(dataUser);
    if (errors.email !== "" || errors.password !== "") {
      setErrorUser(errors);
      return false;
    }
    try {
      const res = await axios.post(`${api}/auth/login`, dataUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log({ res });
      if (res.status === 201) {
        const { token } = res.data;
        // Decodificar el token
        const decodedToken = jwt.decode(token);
        localStorage.setItem(
          "userSession",
          JSON.stringify({
            token: token,
            name: decodedToken.name,
            email: decodedToken.email,
            isAdmin: decodedToken.isAdmin,
            isSuperAdmin: decodedToken.isSuperAdmin,
            isPremium: decodedToken.isPremium,
          })
        );

        if (decodedToken.isAdmin) {
          toast("Te has logueado correctamente", {
            icon: <BiCheck style={{ color: "green", fontSize: "50px" }} />,
          });

          router.push("/");
        } else {
          toast("Te has logueado correctamente", {
            icon: <BiCheck style={{ color: "green", fontSize: "50px" }} />,
          });
          if (!decodedToken.isPremium) {
            localStorage.setItem("showSubscriptionModal", "true");
          }
          router.push("/");
        }
      } else {
        toast(res.data.message, {
          icon: <BiError style={{ color: "red", fontSize: "50px" }} />,
        });
      }
    } catch (error: any) {
      console.error("Error:", error.response.data);
      toast("Error: " + error.response.data.message, {
        icon: <BiError style={{ color: "red", fontSize: "50px" }} />,
      });
      throw new Error(error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="max-w-lg w-full px-10 py-12 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          INGRESAR
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="text-gray-700 font-semibold mb-2 block text-xl"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={dataUser.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
            />
            {errorUser.email && (
              <p className="text-lg italic text-red-500">{errorUser.email}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="text-gray-700 font-semibold mb-2 block text-xl"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={dataUser.password}
                onChange={handleChange}
                placeholder="xxxxxxxxxxx"
                className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <FaEyeSlash size={28} />
                  ) : (
                    <FaEye size={28} />
                  )}
                </button>
              </div>
            </div>
            {errorUser.password && (
              <p className="text-lg italic text-red-500">
                {errorUser.password}
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-96 py-3 mt-6 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300 text-xl"
            >
              INICIAR SESIÓN
            </button>
          </div>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 text-lg">OR</span>
          </div>
        </div>
        <button
          onClick={handleRedirect}
          className="w-full py-3 mb-6 bg-white text-gray-600 font-semibold rounded-md border border-gray-300 hover:bg-gray-100 transition duration-200 flex items-center justify-center text-xl"
        >
          <svg
            className="w-7 h-7 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
              clipRule="evenodd"
            />
          </svg>
          Continuar con Google
        </button>
        <p className="mt-6 text-center text-gray-600 text-lg">
          <Link href="/forgotpassword" className="hover:underline">
            ¿Olvidó su contraseña?{" "}
          </Link>

          <Link href="/register" className="text-blue-500 hover:underline">
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
