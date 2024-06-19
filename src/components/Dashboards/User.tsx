/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { UserData } from "@/interfaces/userData";
import { formatDate } from "@/utils/formatDate";
import { getOrderByUser } from "@/utils/order.util";
import { Order } from "@/interfaces/order";
import Link from "next/link";

const User = () => {
  const [authUser, setAuthUser] = useState<UserData | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState<number>(1);
  const pageSize = 3;
  console.log("authUser", authUser);

  useEffect(() => {
    const userSessionString = localStorage.getItem("userSession");
    const userSession = userSessionString
      ? JSON.parse(userSessionString)
      : null;
    if (userSession) {
      setAuthUser(userSession);
    }

    const fetchOrders = async () => {
      try {
        const response = await getOrderByUser();
        if (response && !response.error) {
          setOrders(response.data);
        } else {
          console.error(response.error || "Error fetching orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, orders.length);
  const visibleOrders = orders.slice(startIndex, endIndex);

  const totalPages = Math.ceil(orders.length / pageSize);

  const goToPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const next = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto pb-10 px-5">
        <h1 className="text-5xl pt-10 pb-4">Mi Cuenta</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5 pt-3">
          <div className="md:col-span-2  bg-gray-100 p-8 rounded">
            <h2 className="text-2xl font-bold mb-2">Historial de compras</h2>
            {orders.length === 0 ? (
              <span>No has realizado compras todavía</span>
            ) : (
              <ul>
                {visibleOrders.map((order) => (
                  <li key={order.id} className="p-2">
                    <div className="p-3 border-b-2 md:flex-row justify-between items-center flex flex-col font-bold gap-3">
                      <img
                        src={order.event.imgUrl}
                        alt={order.event.name}
                        className="md:w-[30%] w-[70%]"
                      />
                      <div className="flex flex-col justify-center p-5 items-center w-[20rem]">
                        <span>{order.event.name}</span>
                        <span>{formatDate(order.event.date)}</span>
                        <span>
                          {order.isUsed ? (
                            <span className="text-[#56c95a]">USADO</span>
                          ) : (
                            <span className="text-[#de4545]">SIN USAR</span>
                          )}
                        </span>
                        <span>ZONA: {order.zone.toLocaleUpperCase()}</span>
                        <div className="flex flex-col border-2 p-2">
                          <span className="text-center">ID DEL TICKET</span>
                          <span className="text-center">{order.id}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-center my-4">
              <button
                onClick={prev}
                disabled={page === 1}
                className="mr-2 px-4 py-2 bg-gray-200  hover:scale-105 transition-transform"
              >
                Anterior
              </button>
              <button
                onClick={next}
                disabled={page === totalPages}
                className="mr-2 px-4 py-2 bg-gray-200  hover:scale-105 transition-transform"
              >
                Siguiente
              </button>
            </div>
          </div>
          <div className="md:col-span-1 bg-gray-100 shadow p-8 break-words self-start">
            <h2 className="font-bold">Detalles de la cuenta</h2>
            <div className="flex flex-col gap-3">
              <div>
                <p>{authUser?.name}</p>
                <p>{authUser?.email}</p>
              </div>
              <div>
                {authUser?.isPremium ? (
                  <span className="text-[#56c95a]">
                    Eres usuario Premium. ¡Gracias!
                  </span>
                ) : (
                  <Link href="/subscription">
                    <span className="text-[#de4545] hover:underline">
                      Pasate a Premium
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
