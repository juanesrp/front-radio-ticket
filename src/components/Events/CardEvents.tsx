import { IEvent } from "@/interfaces";
import React from "react";
import Link from "next/link";

const CardEvents = (event: IEvent) => {
  const minPrice = Math.min(...event.tickets.map((ticket) => ticket.price));
  return (
    <div className="col-span-1 relative flex flex-col items-center bg-gray-100 hover:bg-gray-200">
      <Link href={`/concerts/${event.id}`} className="p-6">
        <div className="flex justify-center">
          <img src={event.imgUrl} className="w-40" />
        </div>
        <div className="flex flex-col items-center px-3 py-3">
          <h1 className="text-sm font-bold text-center">
            {event.date + " | " + event.name}
          </h1>
          <h2 className="text-xs text-center font-medium">Desde ${minPrice}</h2>
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <span className="bg-red-600 text-white p-4 font-semibold">
            VER BOLETOS
          </span>
        </div>
      </Link>
    </div>
  );
};

export default CardEvents;
