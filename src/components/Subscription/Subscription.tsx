"use client";
import { generateSubscription } from "@/utils/order.util";
import React, { useEffect, useState } from "react";

const Subscription = () => {
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userToken = localStorage.getItem("userSession");
      setUserSession(JSON.parse(userToken!));
      if (!userToken) {
        alert("Debes iniciar sesion");
        window.location.href = "/login";
      }
    }
  }, []);

  const handleSubscription = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const data = await generateSubscription();
      console.log(data);

      window.open(data.href, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="py-12 md:py-20">
        <div className="container max-w-4xl px-4 md:px-6">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Únete a nuestro plan premium
              </h1>
              <p className="text-gray-600text-lg md:text-xl">
                No te pierdas la oportunidad de asegurar tus boletos
              </p>
            </div>
            <div className="flex flex-col-reverse sm:flex-row items-center my-8 gap-6">
              <div className="grid gap-2 w-full sm:w-2/3">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                  Suscribete y obten
                </h2>
                <ul className="space-y-2 text-gray-600 ">
                  <li className="flex items-center gap-2">
                    Acceso a los boletos un día antes de que salgan a la venta
                  </li>
                  <li className="flex items-center gap-2">
                    El primero en enterarte de los eventos nuevos
                  </li>
                  <li className="flex items-center gap-2">
                    Descuentos en productos
                  </li>
                </ul>
              </div>
              <div className="text-4xl font-bold text-red-600 content-center">
                $2.99/mes
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleSubscription}
                className="inline-flex items-center justify-center h-12 px-6 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                SUSCRIBIRME
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
