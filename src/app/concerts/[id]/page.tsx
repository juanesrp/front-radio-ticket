"use client";
import CardEventDetail from "@/components/Events/EventDetail/CardEventDetail";
import { eventPreLoad } from "@/helpers/eventPreLoad";
import { IEvent } from "@/interfaces";
import { getEventById } from "@/utils/events.util";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { id: string } }) => {
  const [event, setEvent] = useState<IEvent>();
  const fetchEvents = async () => {
    try {
      const event: IEvent = await getEventById(params.id);
      setEvent(event);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="bg-gray-50">
      {event ? <CardEventDetail event={event} /> : "No se encontro el evento"}
    </div>
  );
};

export default page;
