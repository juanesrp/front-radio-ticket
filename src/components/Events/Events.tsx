"use client";
import React, { useEffect, useState } from "react";
import CardEvents from "./CardEvents";
import { eventPreLoad } from "@/helpers/eventPreLoad";
import { getEvents } from "@/utils/events.util";
import { IEvent } from "@/interfaces";

const Events = () => {
  const eventsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [totalEventsFetched, setTotalEventsFetched] = useState(false);

  const fetchEvents = async (page: number) => {
    try {
      const events: IEvent[] = await getEvents(page, eventsPerPage);

      setEvents(events);
      setTotalEventsFetched(events.length < eventsPerPage);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage]);

  // Manejar el cambio de página
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <header className="grid grid-cols-2 my-4 max-w-6xl mx-auto">
        <div className="">
          <p>Alguna descripción</p>
        </div>
        <div className="flex justify-end">
          <div className="flex flex-col max-w-36">
            <label htmlFor="SortBy" className="font-bold text-sm text-left">
              ORDENAR POR
            </label>
            <select name="SortBy" className="border-none p-2">
              <option value="date" className="font-bold">
                Fecha
              </option>
              <option value="name">Nombre</option>
              <option value="price">Precio</option>
            </select>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-2 mx-3 md:grid-cols-4 gap-2 max-w-6xl md:mx-auto my-4">
        {events.map((event) => (
          <CardEvents key={event.id} {...event} />
        ))}
      </div>
      <div className="flex justify-center my-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 px-4 py-2 bg-gray-200 rounded-md hover:scale-105 transition-transform"
        >
          Página Anterior
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={totalEventsFetched}
          className="ml-2 px-4 py-2 bg-gray-200 rounded-md hover:scale-105 transition-transform"
        >
          Página Siguiente
        </button>
      </div>
    </>
  );
};

export default Events;
