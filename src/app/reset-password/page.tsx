"use client";
import { useEffect, useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { BiCheck, BiError } from "react-icons/bi";
import { toast } from "sonner";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { ResetPasswordProps } from "../../interfaces";
import { validateChangePasswordForms } from "../../helpers/validateForms";
import { useRouter } from "next/navigation";

const api = process.env.NEXT_PUBLIC_API;
const ResetPassword: React.FC = () => {
  const router = useRouter();
  const initialData = {
    password: "",
    confirmPassword: "",
  };

  const [dataUser, setDataUser] = useState<ResetPasswordProps>(initialData);
  const [showPassword, setShowPassword] = useState(false);
  const [errorUser, setErrorUser] = useState<ResetPasswordProps>(initialData);
  const searchParams = useSearchParams();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataUser({
      ...dataUser,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (!errorUser.password && !errorUser.confirmPassword) {
      return;
    }
    const errors = validateChangePasswordForms(dataUser);
    if (errors.password !== "" || errors.confirmPassword !== "") {
      setErrorUser(errors);
    } else {
      setErrorUser(initialData);
    }
  }, [dataUser]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateChangePasswordForms(dataUser);
    if (errors.password !== "" || errors.confirmPassword !== "") {
      setErrorUser(errors);
      return false;
    }

    const token = searchParams.get("token");
    if (!token) {
      toast("Token no válido", {
        icon: <BiError style={{ color: "red", fontSize: "50px" }} />,
      });
      return;
    }

    try {
      const res = await axios.post(
        `${api}/auth/NewPassword?token=${token}`,
        {
          newPassword: dataUser.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 201) {
        toast("Cambio de contraseña realizado con éxito", {
          icon: <BiCheck style={{ color: "green", fontSize: "50px" }} />,
        });
        setDataUser(initialData);
        router.push("/login");
      } else {
        const parsedResponse = await res.data;
        toast(parsedResponse.message, {
          icon: <BiError style={{ color: "red", fontSize: "50px" }} />,
        });
      }
    } catch (error: any) {
      if (error.response) {
        toast("Error: " + error.response.data.message, {
          icon: <BiError style={{ color: "red", fontSize: "50px" }} />,
        });
      } else {
        toast("Ha ocurrido un error al cambiar la contraseña", {
          icon: <BiError style={{ color: "red", fontSize: "50px" }} />,
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center bg-white py-10 mt-20">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          RESTABLECER CONTRASEÑA DE CUENTA
        </h1>
        <p className="mb-4 text-center text-xl">
          Ingresa una nueva contraseña para tu usuario
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="relative">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={dataUser.password}
                onChange={handleChange}
                placeholder="Contraseña"
                className="w-full mt-3 px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 right-0 pr-3 mt-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <p
                className={`mb-3 mt-2 text-justify text-sm ${
                  errorUser.password
                    ? "text-red-500 text-l"
                    : "text-gray-600 text-l"
                }`}
              >
                La contraseña debe contener al menos una letra mayúscula, una
                letra minúscula, un número y un carácter especial (!@#$%^&*), y
                tener entre 8 y 15 caracteres de longitud.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={dataUser.confirmPassword}
                onChange={handleChange}
                placeholder="Confirmar contraseña"
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>
            {errorUser.confirmPassword && (
              <p className="text-lg italic text-red-500">
                {errorUser.confirmPassword}
              </p>
            )}
          </div>
          <div className="flex justify-center " style={{ marginTop: "2rem" }}>
            <button
              type="submit"
              className="w-80 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              RESTABLECER CONTRASEÑA
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ResetPassword;
