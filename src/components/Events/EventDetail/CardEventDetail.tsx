"use client";
import { IEvent } from "@/interfaces";
import React, { useEffect, useState } from "react";
import EventDetail from "./EventDetail";
import CardEvents from "../CardEvents";
import Link from "next/link";
import { getEventsByDate } from "@/utils/events.util";

const CardEventDetail = ({ event }: { event: IEvent }) => {
  const eventsPerPage = 5;
  const [events, setEvents] = useState<IEvent[]>([]);

  const fetchEvents = async (page: number) => {
    try {
      const events: IEvent[] = await getEventsByDate(
        page,
        eventsPerPage,
        "ascending"
      );
      const eventsFilter = events.filter((e) => e.id !== event.id);
      setEvents(eventsFilter);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents(1);
  }, []);

  return (
    <main>
      <EventDetail event={event} />
      <section className="grid pt-20 px-4 lg:px-0 bg-white">
        <h1 className="text-3xl font-medium text-center mb-7">
          TAMBIEN TE PUEDE INTERESAR
        </h1>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 max-w-6xl mx-auto">
          {events.map((event) => (
            <CardEvents key={event.id} {...event} />
          ))}
        </div>
      </section>
      <div className=" py-20 px-5 bg-white">
        <Link
          href="/concerts"
          className="block text-3xl hover:text-red-500 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-5 inline-block"
          >
            <path
              strokeLinecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          VER TODOS LOS EVENTOS
        </Link>
      </div>
    </main>
  );
};

export default CardEventDetail;
