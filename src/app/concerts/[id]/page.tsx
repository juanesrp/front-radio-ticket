import CardEventDetail from "@/components/Events/EventDetail/CardEventDetail";
import { IEvent } from "@/interfaces";
import { getEventById } from "@/utils/events.util";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const event: IEvent = await getEventById(params.id);

  return (
    <div className="bg-gray-50">
      {event ? <CardEventDetail event={event} /> : "No se encontro el evento"}
    </div>
  );
};

export default page;
