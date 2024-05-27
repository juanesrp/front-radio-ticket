"use client";
import React, { useState } from "react";
import CardEvents from "./CardEvents";
import { eventPreLoad } from "@/helpers/eventPreLoad";

const Events = () => {
  const events = eventPreLoad;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-6xl mx-auto">
      {events.map((event) => (
        <CardEvents key={event.id} {...event} />
      ))}
    </div>
  );
};

export default Events;
