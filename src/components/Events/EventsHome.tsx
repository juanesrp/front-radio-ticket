"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CardEvents from "./CardEvents";
import { IEvent } from "@/interfaces";
import { getEventsByDate } from "@/utils/events.util";
import { BiCheck } from "react-icons/bi";

const EventsHome = () => {
  const eventsPerPage = 3;
  const [events, setEvents] = useState<IEvent[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  const fetchEvents = async (page: number) => {
    try {
      const events: IEvent[] = await getEventsByDate(
        page,
        eventsPerPage,
        "ascending"
      );
      setEvents(events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents(1);

    // Verificar si debe mostrar la alerta de suscripción
    const showSubscriptionAlert = localStorage.getItem("showSubscriptionModal");
    if (showSubscriptionAlert === "true") {
      setShowAlert(true);
      localStorage.removeItem("showSubscriptionModal");
    }
  }, []);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      {showAlert && (
        <div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-[#292424] text-white p-7 flex flex-col gap-4 justify-between items-center z-50 rounded"
          style={{
            boxShadow:
              "0 0.1rem 0.2rem #00000033, 0 0.1rem 0.5rem #0000004d, 0 0.2rem 1.5rem #00000066",
          }}
        >
          <div>
            <p className="text-lg mb-4 font-semibold text-center">
              Actualízate a Premium.
            </p>
            <ul className="space-y-2 ">
              <li className="flex items-center gap-2">
                <BiCheck className="text-green-400" />
                Acceso a los boletos un día antes de que salgan a la venta
              </li>
              <li className="flex items-center gap-2">
                <BiCheck className="text-green-400" />
                El primero en enterarte de los eventos nuevos
              </li>
              <li className="flex items-center gap-2">
                <BiCheck className="text-green-400" />
                Descuentos en productos
              </li>
            </ul>
          </div>
          <div className="flex justify-evenly w-full">
            <Link href="/subscription">
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Actualizar
              </button>
            </Link>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded"
              onClick={handleCloseAlert}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      <section className="grid py-16 px-5 md:px-2 bg-white">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 max-w-6xl mx-auto">
          <div className="col-span-1 items-center">
            {events.length > 0 && (
              <Link
                href="/concerts"
                className="relative block box-content h-full group"
                style={{
                  backgroundImage: `url(${events[0].imgUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300"></div>
                <div className="absolute left-0 bottom-12 mr-2">
                  <p className="inline text-2xl bg-red-600 text-white decoration-clone text-center px-3 sm:text-3xl leading-snug">
                    PRÓXIMOS EVENTOS
                  </p>
                  <p className="text-white text-sm p-2">VER TODO</p>
                </div>
              </Link>
            )}
          </div>
          {events.map((event) => (
            <CardEvents key={event.id} {...event} />
          ))}
        </div>
      </section>
    </>
  );
};

export default EventsHome;
