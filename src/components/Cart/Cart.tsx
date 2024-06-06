"use client";
import { ICartItem } from "@/interfaces";
import { UserData } from "@/interfaces/userData";
import { getDiscount } from "@/utils/discount.util";
import { createOrder } from "@/utils/order.util";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Cart = () => {
  const [userSession, setUserSession] = useState<UserData>();
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [discounts, setDiscounts] = useState<{ [key: string]: number }>({});
  console.log(discounts);

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
        calculateTotal(storedCart, discounts);
        setCart(storedCart);
      }
    }
  }, [discounts]);

  const handleDecrement = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    const updatedCart = [...cart];
    if (updatedCart[index].ticket.quantity > 1) {
      updatedCart[index].ticket.quantity -= 1;
      setCart(updatedCart);
      updateLocalStorage(updatedCart);
      calculateTotal(updatedCart, discounts);
    }
  };

  const handleIncrement = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    const updatedCart = [...cart];
    updatedCart[index].ticket.quantity += 1;
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
    calculateTotal(updatedCart, discounts);
  };

  const updateLocalStorage = (updatedCart: any[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = (
    updatedCart: ICartItem[],
    discounts: { [key: string]: number }
  ) => {
    const totalCart = updatedCart.reduce((acc, event) => {
      const discount = discounts[event.id] || 0;
      return (
        acc + event.ticket.price * event.ticket.quantity * (1 - discount / 100)
      );
    }, 0);
    setTotal(totalCart);
  };

  const handleDiscountCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountCode(e.target.value);
  };

  const applyDiscount = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      console.log("Este es el discount code que voy a enviar: ", discountCode);

      const data = await getDiscount(discountCode);

      const updatedDiscounts = { ...discounts, [data.event.id]: data.discount };
      setDiscounts(updatedDiscounts);
      setCart(cart);
      calculateTotal(cart, discounts);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeEvent = (index: number) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
    calculateTotal(updatedCart, discounts);
    window.location.reload();
  };

  const getPriceWithDiscount = (price: number, eventId: string) => {
    const discount = discounts[eventId] || 0;
    return price * (1 - discount / 100);
  };

  const sendOrder = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const order = {
        tickets: cart.map((event) => ({
          id: event.ticket.id,
          quantity: event.ticket.quantity,
          price: getPriceWithDiscount(event.ticket.price, event.id),
        })),
      };

      const data = await createOrder(order);
      window.open(data.init_point, "_blank");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid grid-cols-1">
      {cart.length ? (
        <div className="max-w-6xl w-full mx-auto p-5">
          <h1>Cart</h1>
          <form className="w-full">
            <table className="w-full">
              <tbody className="flex flex-col gap-2">
                {cart.map((event: any, index: number) => (
                  <tr key={event.id} className="bg-gray-50 flex items-center">
                    <td className="w-1/6 p-5">
                      <Link href={`/concerts/${event.id}`} className="max-w-36">
                        <img src={event.imgUrl} alt="Event.image" />
                      </Link>
                    </td>
                    <td className="w-4/6 p-5">
                      <h3 className="font-bold text-lg">
                        {event.date} | {event.name}
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
                          value={event.ticket.quantity}
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
                      {discounts[event.id] ? (
                        <div>
                          <span className="line-through text-red-600">
                            ${event.ticket.price * event.ticket.quantity}
                          </span>{" "}
                          <span>
                            $
                            {getPriceWithDiscount(
                              event.ticket.price,
                              event.id
                            ) * event.ticket.quantity}
                          </span>
                        </div>
                      ) : (
                        <span>
                          ${event.ticket.price * event.ticket.quantity}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end">
              <div className="flex flex-col p-5 gap-3 w-1/2">
                <div className="flex justify-between w-full">
                  <h1>Subtotal:</h1>
                  <p>
                    $
                    {cart.reduce((acc, event) => {
                      return acc + event.ticket.price * event.ticket.quantity;
                    }, 0)}
                  </p>
                </div>
                <div className="flex justify-between w-full">
                  <h1>Descuento:</h1>
                  <p>
                    -$
                    {cart.reduce((acc, event) => {
                      const discount = discounts[event.id] || 0;
                      return (
                        acc +
                        event.ticket.price *
                          event.ticket.quantity *
                          (discount / 100)
                      );
                    }, 0)}
                  </p>
                </div>
                <div className="flex justify-between w-full">
                  <h1>Total:</h1>
                  <p>${total}</p>
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
                <button
                  onClick={sendOrder}
                  className="bg-red-600 text-white p-2 max-h-12 text-center text-base hover:bg-red-700 "
                >
                  FINALIZAR PEDIDO
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="w-full h-screen flex flex-col justify-center items-center gap-3">
          <h1 className="text-2xl">No hay tickets en tu carrito</h1>
          <Link href={"/concerts"}>
            <button className="bg-red-600 text-white p-2 text-center text-xl hover:bg-red-700 ">
              Ir a comprar
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
