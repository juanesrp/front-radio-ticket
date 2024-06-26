import CreateDiscountSuperAdmin from "@/components/CreateDiscount/CreateDiscountSuperAdmin";
import { IEvent } from "@/interfaces";
import { getEventById } from "@/utils/events.util";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const event: IEvent = await getEventById(params.id);
  return (
    <>
      <div>
        {event ? (
          <CreateDiscountSuperAdmin event={event} />
        ) : (
          "No se encontro el evento"
        )}
      </div>
    </>
  );
};

export default page;
