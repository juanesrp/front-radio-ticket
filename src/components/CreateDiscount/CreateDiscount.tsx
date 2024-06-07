"use client";
import { DiscuontResponse, IEvent } from "@/interfaces";
import { postDiscount } from "@/utils/discount.util";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import React, { useState } from "react";

const CreateDiscount = ({ event }: { event: IEvent }) => {
  const [discount, setDiscount] = useState("");
  const [code, setCode] = useState<DiscuontResponse["data"] | null>(null);

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscount(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const discountValue = parseInt(discount, 10);
    if (isNaN(discountValue) || discountValue < 10 || discountValue > 100) {
      alert("El valor del descuento debe estar entre 10 y 100");
    } else {
      try {
        const res = await postDiscount(event.id, discountValue);

        setCode(res);
        console.log("🚀 ~ handleSubmit ~ res:", res);
        alert(`Se creó un descuento con el ${discountValue}%`);
        setDiscount("");
      } catch (error) {
        console.error("Error al crear el descuento:", error);
        alert(
          "Hubo un error al crear el descuento. Por favor, inténtalo de nuevo más tarde."
        );
      }
    }
  };

  return (
    <>
      <div className="bg-gray-50">
        <div className="flex md:flex-row flex-col max-[768px]:items-center md:justify-between py-10 max-w-4xl mx-auto">
          <div>
            <img
              src={event.imgUrl}
              alt={event.name}
              className="w-full max-w-96"
            />
          </div>
          <div className="flex flex-col mt-5">
            <span className="text-3xl font-bold">
              {`${formatDate(event.date)} | ${event.name}`}
            </span>
            <span>
              {event.tickets.map((ticket) => (
                <span key={ticket.id}>
                  <div className="flex flex-col my-3">
                    <span>
                      <span className="font-bold">Zona:</span> {ticket.zone}
                    </span>
                    <span>
                      <span className="font-bold">Precio:</span>{" "}
                      {`$${ticket.price}`}
                    </span>
                  </div>
                </span>
              ))}
            </span>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <label htmlFor="discount" className="text-[0.7rem] font-bold p-2">
                DESCUENTO
              </label>
              <div className="flex justify-around">
                <input
                  type="number"
                  name="discount"
                  id="discount"
                  className="w-40 rounded"
                  value={discount}
                  onChange={handleDiscountChange}
                />
                <button className="bg-red-600 text-white p-2 max-h-12  text-center text-sm hover:bg-red-700">
                  AGREGAR DESCUENTO
                </button>
              </div>
            </form>
            <div className="flex flex-col mt-2">
              <span>Código del evento creado: {code?.code}</span>
              <span>Descuento del evento creado: {code?.discount}%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center text-3xl p-9">
        <Link
          href={"/dashAdmi"}
          className="hover:text-red-600 transition duration-300"
        >
          VOLVER AL PERFIL
        </Link>
      </div>
    </>
  );
};

export default CreateDiscount;
