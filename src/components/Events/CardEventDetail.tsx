import { IEvent } from "@/interfaces";
import React from "react";

const CardEventDetail = ({ event }: { event: IEvent }) => {
  return (
    <main>
      <section className=" pt-16 mb-10">
        <div className="grid grid-cols-2 max-w-6xl mx-auto">
          <div className="flex justify-center items-center px-6">
            <img src={event.image} className="w-full  max-w-96" />
          </div>
          <div className="grid-cols-1">
            <h1 className="text-3xl font-bold">
              {event.date} | {event.name}
            </h1>
          </div>
        </div>
      </section>
      <section className="grid py-20 bg-white">
        <h1 className="text-3xl font-medium text-center mb-7">
          TAMBIEN TE PUEDE INTERESAR
        </h1>

        <div className="grid grid-cols-4 max-w-6xl mx-auto">
          <h2 className="text-xl font-medium">Descripción</h2>
          <p>{event.description}</p>
        </div>
      </section>
    </main>
  );
};

export default CardEventDetail;
