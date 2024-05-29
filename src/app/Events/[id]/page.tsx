import CardEventDetail from "@/components/Events/EventDetail/CardEventDetail";
import { eventPreLoad } from "@/helpers/eventPreLoad";
import React from "react";

const page = ({ params }: { params: { id: number } }) => {
  const event = eventPreLoad.find((event) => event.id === Number(params.id));
  return (
    <div className="bg-gray-50">
      {event ? <CardEventDetail event={event} /> : "No se encontro el evento"}
    </div>
  );
};

export default page;