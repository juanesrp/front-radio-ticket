"use client";
import { IEvent } from "@/interfaces";
import React, { useState } from "react";
import EventDetail from "./EventDetail";
import CardEvents from "../CardEvents";
import { eventPreLoad } from "@/helpers/eventPreLoad";

const CardEventDetail = ({ event }: { event: IEvent }) => {
  const events = eventPreLoad;

  return (
    <main>
      <EventDetail event={event} />
      <section className="grid py-20 bg-white">
        <h1 className="text-3xl font-medium text-center mb-7">
          TAMBIEN TE PUEDE INTERESAR
        </h1>
        <div className="grid grid-cols-4 max-w-6xl mx-auto">
          {events.map((event) => (
            <CardEvents key={event.id} {...event} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default CardEventDetail;
