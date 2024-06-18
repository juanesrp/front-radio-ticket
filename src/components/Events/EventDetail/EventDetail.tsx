"use client";

import { IEvent } from "@/interfaces";
import { formatDate } from "@/utils/formatDate";
import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Coordinates, Map } from "@/components/Map";
import { BiError, BiCartAdd } from "react-icons/bi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { differenceInDays, isPast, isToday, parseISO } from "date-fns";
import Link from "next/link";

const EventDetail = ({ event }: { event: IEvent }) => {
  const router = useRouter();
  const [selectedZone, setSelectedZone] = useState(event.tickets[0].zone);
  const [selectedPrice, setSelectedPrice] = useState(event.tickets[0].price);
  const [selectedStock, setSelectedStock] = useState(event.tickets[0].stock);
  const [quantity, setQuantity] = useState(1);
  const [userSession, setUserSession] = useState();
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const API_KEY = "NEXT_PUBLIC_MAPS_API_KEY";
  console.log(event);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userToken = localStorage.getItem("userSession");
      const userData = JSON.parse(userToken!);
      setUserSession(userData);
      setIsPremiumUser(userData.isPremium);
    }
  }, []);

  const handleBuy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (userSession) {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const ticket = event.tickets.find(
        (ticket) => ticket.zone === selectedZone
      );
      const newCart = {
        id: event.id,
        name: event.name,
        imgUrl: event.imgUrl,
        date: formatDate(event.date),
        ticket: {
          id: ticket?.id,
          price: ticket?.price,
          zone: ticket?.zone,
          quantity: quantity,
        },
      };

      cart.push(newCart);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast(
        <div style={{ display: "flex", alignItems: "center" }}>
          <BiCartAdd
            style={{ color: "green", fontSize: "60px", marginRight: "10px" }}
          />
          <span style={{ marginLeft: "10px" }}>
            ¡Añadido al carrito con éxito!
          </span>
        </div>,
        {
          duration: 1000,
        }
      );
      setTimeout(() => {
        window.location.reload();
        router.push("/cart");
      }, 1000);
    } else {
      toast(
        <div style={{ display: "flex", alignItems: "center" }}>
          <BiError
            style={{ color: "red", fontSize: "50px", marginRight: "10px" }}
          />
          <span style={{ marginLeft: "10px" }}>
            Debes iniciar sesión para comprar
          </span>
        </div>
      );
      router.push("/login");
    }
  };
  // Manejar el cambio de zona
  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const zone = e.target.value;
    setSelectedZone(zone);
    // Encontrar el precio correspondiente a la zona seleccionada
    const ticket = event.tickets.find((ticket) => ticket.zone === zone);
    if (ticket) {
      setSelectedPrice(ticket.price);
      setSelectedStock(ticket.stock);
      setQuantity(1); // Reset quantity to 1 when zone changes
    }
  };

  const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (quantity < selectedStock) {
      setQuantity(quantity + 1);
    }
  };

  const cordinates: Coordinates = {
    lat: Number(event.latitude),
    lng: Number(event.longitude),
  };

  return (
    <section className="pt-10 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-5 md:mx-auto">
        <div className="flex justify-center items-center px-6">
          <img src={event.imgUrl} className="w-full max-w-96" />
        </div>
        <div className="grid-cols-1">
          <div className="flex flex-col mt-5 text-center md:text-left ">
            <h1 className="text-3xl font-bold">
              {formatDate(event.date)} | {event.name}
            </h1>
            <h2 className="text-lg font-normal">{selectedPrice}</h2>
            <span className="text-sm text-red-600">
              {selectedStock <= 10 && selectedStock > 0
                ? `Quedan los ultimos ${selectedStock} boletos!!`
                : ""}
            </span>
          </div>

          <div className="text-l">
            <p> *Boletas generales disponibles a partir del {formatDate(event.launchdate)}*</p>
          </div>
          <div className="text-l">
            <p> *Recuerda que si eres <Link href={"/subscription"} className="text-red-600 hover:text-red-700 transition duration-300">PREMIUM,</Link> tienes la opción de comprar un día antes.*</p>
          </div>

          <form className="mt-4 flex flex-wrap w-full px-3 gap-1">
            <div className="flex flex-col w-2/3 lg:w-5/12">
              <label htmlFor="Location" className="mb-2 text-xs font-semibold ">
                LOCALIDAD
              </label>
              <select
                name="Location"
                value={selectedZone}
                onChange={handleZoneChange}
                className="border-none bg-gray-50 text-sm"
              >
                {event.tickets.map((ticket) => (
                  <option key={ticket.id} value={ticket.zone}>
                    {ticket.zone}
                  </option>
                ))}
              </select>
            </div>

            {event.status !== "not available" &&
              (event.status === "Available" ||
                (event.status === "available for premium" && isPremiumUser)) ? (
              <>
                <div className="flex flex-col w-[30%] lg:w-1/5">
                  <label htmlFor="quantity" className="mb-2 text-xs font-semibold">
                    CANTIDAD
                  </label>
                  <div className="flex items-center relative">
                    <input
                      type="number"
                      value={quantity}
                      readOnly
                      className="w-full py-1 text-center bg-gray-50 border-none"
                    />
                    <button
                      onClick={handleDecrement}
                      className={`absolute top-0 bottom-0 left-0 text-center w-7 border-solid border-r-2 border-l-2 border-[#e7e7e7] hover:bg-[#e7e7e7] transition duration-200 ${quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <button
                      onClick={handleIncrement}
                      className={`absolute top-0 bottom-0 right-0 w-7 border-solid border-r-2 border-l-2 border-[#e7e7e7] hover:bg-[#e7e7e7] transition duration-200 ${quantity >= selectedStock
                          ? "opacity-50 cursor-not-allowed bg-gray-400"
                          : ""
                        }`}
                      disabled={quantity >= selectedStock}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex w-full mt-4 ml-3 lg:w-1/3 lg:items-end">
                  <button
                    onClick={handleBuy}
                    disabled={selectedStock === 0}
                    className="bg-red-600 text-white p-2 max-h-12 w-full text-center text-sm hover:bg-red-700 disabled:bg-red-300"
                  >
                    {selectedStock > 0 ? `AGREGAR AL CARRITO` : "AGOTADO"}
                  </button>
                </div>
              </>
            ) : null}

            <Map coordinates={cordinates} />

            <div className="flex flex-col mt-5">
              <h1 className="text-xl font-bold mb-4">{event.address}</h1>

              <div>
                <p>{event.description}</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EventDetail;
