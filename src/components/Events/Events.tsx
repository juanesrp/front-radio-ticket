"use client";
import React, { useEffect, useState } from "react";
import CardEvents from "./CardEvents";
import { eventPreLoad } from "@/helpers/eventPreLoad";
import {
  getEvents,
  getEventsByAZ,
  getEventsByCategory,
  getEventsByDate,
  getEventsByPrice,
} from "@/utils/events.util";
import { ICategory, IEvent } from "@/interfaces";
import { getCategories } from "@/utils/categories.util";

const Events = () => {
  const eventsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [totalEventsFetched, setTotalEventsFetched] = useState(false);
  const [sortBy, setSortBy] = useState("recentsToOlds");
  const [category, setCategory] = useState("");

  console.log(categories);
  console.log(category);

  const fetchEvents = async (page: number, category: string) => {
    try {
      let events: IEvent[] = [];

      if (sortBy === "oldsToRecents") {
        console.log("Estoy en el if", category);

        events = await getEventsByDate(
          page,
          eventsPerPage,
          "descending",
          category || undefined
        );
      } else if (sortBy === "alphabeticalAZ") {
        events = await getEventsByAZ(
          "ascending",
          page,
          eventsPerPage,
          category || undefined
        );
      } else if (sortBy === "alphabeticalZA") {
        events = await getEventsByAZ(
          "descending",
          page,
          eventsPerPage,
          category || undefined
        );
      } else if (sortBy === "priceMinToHigh") {
        events = await getEventsByPrice(
          "ascending",
          page,
          eventsPerPage,
          category || undefined
        );
      } else if (sortBy === "priceHighToMin") {
        events = await getEventsByPrice(
          "descending",
          page,
          eventsPerPage,
          category || undefined
        );
      } else {
        events = await getEventsByDate(
          page,
          eventsPerPage,
          "ascending",
          category || undefined
        );
      }
      setEvents(events);
      setTotalEventsFetched(events.length < eventsPerPage);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categories: ICategory[] = await getCategories();
      setCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchEvents(currentPage, category);
  }, [currentPage, sortBy, category]);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <header className="grid grid-cols-1 gap-2 sm:grid-cols-2 my-4 max-w-6xl mx-auto">
        <div>
          <p className="text-3xl font-bold text-center">PRÓXIMOS EVENTOS</p>
        </div>
        <div className="flex justify-evenly sm:justify-end gap-5">
          <div className="flex flex-col ">
            <label htmlFor="filterByCategory" className="font-bold text-sm">
              FILTRAR POR CATEGORIA
            </label>
            <select
              name="filterByCategory"
              className="border-none p-2"
              onChange={handleCategoryChange}
            >
              <option value="">CATEGORIAS</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col max-w-40">
            <label htmlFor="SortBy" className="font-bold text-sm text-left">
              ORDENAR POR
            </label>
            <select
              name="SortBy"
              className="border-none p-2 w-full"
              onChange={handleSortChange}
            >
              <option value="recentsToOlds">Más cercanos</option>
              <option value="oldsToRecents">Más lejanos</option>
              <option value="alphabeticalAZ">Alfabéticamente, A-Z</option>
              <option value="alphabeticalZA">Alfabéticamente, Z-A</option>
              <option value="priceMinToHigh">Precio, menor a mayor</option>
              <option value="priceHighToMin">Precio, mayor a menor</option>
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
