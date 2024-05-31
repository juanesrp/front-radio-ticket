"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CardEvents from "./CardEvents";
import { IEvent } from "@/interfaces";
import { getEventsByDate } from "@/utils/events.util";

const EventsHome = () => {
  const eventsPerPage = 3;
  const [events, setEvents] = useState<IEvent[]>([]);

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
  }, []);

  return (
    <section className="grid py-20 px-5 md:px-0 bg-white">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 max-w-6xl mx-auto">
        <div className="col-span-1 items-center">
          {events.length > 0 && (
            <Link
              href="/concerts"
              className="relative block box-content h-full z-[1] group"
              style={{
                backgroundImage: `url(${events[0].imgUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300"></div>
              <div className="absolute left-0 bottom-12 z-[2] mr-2">
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
  );
};

export default EventsHome;
