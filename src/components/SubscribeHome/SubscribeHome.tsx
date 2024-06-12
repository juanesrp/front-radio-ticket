"use client";
import React, { useEffect, useState } from "react";

const SubscribeHome = () => {
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userToken = localStorage.getItem("userSession");
      setUserSession(JSON.parse(userToken!));
    }
  }, []);

  const handleRedirect = () => {
    if (userSession) {
      window.location.href = "/subscription";
    } else {
      alert("Debes iniciar sesion");
      window.location.href = "/login";
    }
  };

  return (
    <div className="flex justify-center max-w-6xl mx-auto p-5">
      <section className="bg-gray-50 w-full p-5">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Suscríbete y obtén acceso exclusivo
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Como suscriptor, podrás comprar boletos un día antes de que salgan
              a la venta y disfrutar de otros beneficios exclusivos.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <button
              onClick={handleRedirect}
              className="w-full bg-red-600 text-white p-2 text-center text-sm hover:bg-red-700"
            >
              SUSCRIBIRME
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Suscríbete ahora y no te pierdas nada.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubscribeHome;
