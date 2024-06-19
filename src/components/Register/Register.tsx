"use client";
import { validateRegisterForms } from "@/helpers/validateForms";
import { RegisterErrorProps, RegisterProps } from "@/interfaces/register";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BiCheck, BiError } from "react-icons/bi";
import { FaEyeSlash, FaEye } from "react-icons/fa";
const api = process.env.NEXT_PUBLIC_API;

const Register: React.FC = () => {
  const router = useRouter();
  const initialdata = {
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [dataUser, setDataUser] = useState<RegisterProps>(initialdata);
  const [errorUser, setErrorUser] = useState<RegisterErrorProps>(initialdata);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (
      !errorUser.name &&
      !errorUser.lastName &&
      !errorUser.phone &&
      !errorUser.email &&
      !errorUser.password &&
      !errorUser.confirmPassword
    ) {
      return;
    }
    const errors = validateRegisterForms(dataUser);
    if (
      errors.name !== "" ||
      errors.lastName !== "" ||
      errors.phone! == "" ||
      errors.email !== "" ||
      errors.password !== "" ||
      errors.confirmPassword !== ""
    ) {
      setErrorUser(errors);
    } else {
      setErrorUser(initialdata);
    }
  }, [dataUser]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateRegisterForms(dataUser);
    if (
      errors.name !== "" ||
      errors.lastName !== "" ||
      errors.phone !== "" ||
      errors.email !== "" ||
      errors.password !== "" ||
      errors.confirmPassword !== ""
    ) {
      setErrorUser(errors);
      return false;
    }
    try {
      const res = await axios.post(`${api}/auth/signup`, dataUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 201) {
        toast("El usuario se ha registrado exitosamente", {
          icon: <BiCheck style={{ color: "green", fontSize: "50px" }} />,
        });
        setDataUser(initialdata);
        router.push("/login");
      } else {
        const parsedResponse = await res.data;
        toast(parsedResponse.message, {
          icon: <BiError style={{ color: "red", fontSize: "50px" }} />,
        });
      }
    } catch (error: any) {
      console.error("Error:", error);
      if (error.response) {
        toast("Error: " + error.response.data.message, {
          icon: <BiError style={{ color: "red", fontSize: "50px" }} />,
        });
      } else {
        toast("Ha ocurrido un error durante el registro", {
          icon: <BiError style={{ color: "red", fontSize: "50px" }} />,
        });
      }
      throw new Error("Registration failed");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setDataUser({
      ...dataUser,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white mt-20 mb-20">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full px-12 py-14 bg-gray-100 rounded-lg shadow-md"
      >
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          CREAR CUENTA
        </h1>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2 text-xl"
          >
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
          {errorUser.name && (
            <p className="text-lg italic text-red-500">{errorUser.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-gray-700 font-semibold mb-2 text-xl"
          >
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
          {errorUser.lastName && (
            <p className="text-lg italic text-red-500">{errorUser.lastName}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-gray-700 font-semibold mb-2 text-xl"
          >
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
          {errorUser.phone && (
            <p className="text-lg italic text-red-500">{errorUser.phone}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2 text-xl"
          >
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
          {errorUser.email && (
            <p className="text-lg italic text-red-500">{errorUser.email}</p>
          )}
        </div>

        <div className="mb-6 relative">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2 text-xl"
          >
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={dataUser.password}
              onChange={handleChange}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>
          <p
            className={`mb-3 mt-2 text-justify text-sm ${
              errorUser.password
                ? "text-red-500 text-l"
                : "text-gray-600 text-l"
            }`}
          >
            La contraseña debe contener al menos una letra mayúscula, una letra
            minúscula, un número y un carácter especial (!@#$%^&*), y tener
            entre 8 y 15 caracteres de longitud.
          </p>
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2 text-xl"
          >
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
          {errorUser.confirmPassword && (
            <p className="text-lg italic text-red-500">
              {errorUser.confirmPassword}
            </p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-80 py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-200 text-xl"
          >
            CREAR
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
