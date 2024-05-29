import { IEvent } from "@/interfaces";
import React from "react";
import Link from "next/link";

const CardEvents = (event: IEvent) => {
  return (
    <div className="col-span-1 relative flex flex-col items-center bg-gray-100 hover:bg-gray-200">
      <Link href={`/Events/${event.id}`} className="p-6">
        <div className="flex justify-center">
          <img src={event.image} className="w-40" />
        </div>
        <div className="flex flex-col items-center px-3">
          <h1 className="text-lg font-bold text-center">
            {event.date + " | " + event.name}
          </h1>
          <h2 className="text-md text-center font-medium">
            Desde ${event.price}
          </h2>
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
