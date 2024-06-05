"use client";
import { ICartItem } from "@/interfaces";
import { UserData } from "@/interfaces/userData";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Cart = () => {
  const [userSession, setUserSession] = useState<UserData>();
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  console.log(cart);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userToken = localStorage.getItem("userSession");
      setUserSession(JSON.parse(userToken!));
      if (!userToken) {
        alert("Debes iniciar sesion");
        window.location.href = "/login";
      }

      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (storedCart) {
        calculateTotal(storedCart);
        setCart(storedCart);
      }
    }
  }, []);

  const handleDecrement = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
      updateLocalStorage(updatedCart);
      calculateTotal(updatedCart);
    }
  };

  const handleIncrement = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
    calculateTotal(updatedCart);
  };

  const updateLocalStorage = (updatedCart: any[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = (updatedCart: any[]) => {
    const totalCart = updatedCart.reduce(
      (acc, event) => acc + event.selectedPrice * event.quantity,
      0
    );
    setTotal(totalCart);
  };

  const handleDiscountCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountCode(e.target.value);
    console.log(discountCode);
  };

  const applyDiscount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (discountCode === "RADIOTICKET") {
      setDiscountPercentage(20);
    } else {
      setDiscountPercentage(0);
    }
  };

  const removeEvent = (index: number) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
    calculateTotal(updatedCart);
  };

  const discountTotal = (total: number) => {
    return total * (1 - discountPercentage / 100);
  };
  return (
    <div className="grid grid-cols-1">
      <div className="max-w-6xl mx-auto p-5">
        <h1>Cart</h1>
        <form className="w-full">
          <table className="w-full">
            <tbody className="flex flex-col gap-2">
              {cart.map((event: any, index: number) => (
                <tr className="bg-gray-50 flex items-center">
                  <td className="w-1/6 p-5">
                    <Link
                      href={`/events/${event.event.id}`}
                      className="max-w-36"
                    >
                      <img src={event.event.imgUrl} alt="Event.image" />
                    </Link>
                  </td>
                  <td className="w-4/6 p-5">
                    <h3 className="font-bold text-lg">
                      {event.event.date} | {event.event.name}
                    </h3>
                    <p>{event.selectedZone}</p>
                    <p
                      className="text-red-600 mt-3"
                      onClick={() => removeEvent(index)}
                    >
                      Quitar
                    </p>
                  </td>
                  <td className="p-5 w-36">
                    <div className="flex items-center relative">
                      <input
                        type="number"
                        value={event.quantity}
                        readOnly
                        className=" w-full py-1 text-center bg-gray-50 border-none"
                      />
                      <button
                        onClick={(e) => handleDecrement(e, index)}
                        className="absolute top-0 bottom-0 left-0 text-center w-7 border-solid border-r-2 border-l-2 border-[#e7e7e7] hover:bg-[#e7e7e7] transition duration-200"
                      >
                        -
                      </button>
                      <button
                        onClick={(e) => handleIncrement(e, index)}
                        className="absolute top-0 bottom-0 right-0 w-7 border-solid border-r-2 border-l-2 border-[#e7e7e7] hover:bg-[#e7e7e7] transition duration-200"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="w-1/6 text-right text-base p-5">
                    ${event.selectedPrice * event.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end">
            <div className="flex flex-col p-5 gap-3 w-1/2">
              <div className="flex justify-between w-full">
                <h1>Subtotal:</h1>
                <p>${total}</p>
              </div>
              <div className="flex justify-between w-full">
                <h1>Descuento:</h1>
                <p>-${total * (discountPercentage / 100)}</p>
              </div>
              <div className="flex justify-between w-full">
                <h1>Total:</h1>
                <p>${discountTotal(total)}</p>
              </div>
              <div className="flex justify-between gap-1 w-full">
                <input
                  type="text"
                  placeholder="Codigo de Descuento"
                  className="w-10/12"
                  value={discountCode}
                  onChange={handleDiscountCode}
                />
                <button
                  className="bg-gray-400 text-white p-2 text-center text-sm hover:bg-gray-500"
                  onClick={applyDiscount}
                >
                  APLICAR
                </button>
              </div>
              <button className="bg-red-600 text-white p-2 max-h-12 text-center text-base hover:bg-red-700 ">
                FINALIZAR PEDIDO
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cart;
