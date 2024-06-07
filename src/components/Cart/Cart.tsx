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
  const [paymentMethod, setPaymentMethod] = useState("");
  console.log(paymentMethod);

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
    if (!paymentMethod) {
      alert("Debes seleccionar un metodo de pago");
      return;
    }
    try {
      const order = {
        tickets: cart.map((event) => ({
          id: event.ticket.id,
          quantity: event.ticket.quantity,
          price: getPriceWithDiscount(event.ticket.price, event.id),
        })),
        paymentMethod: paymentMethod,
      };
      const data = await createOrder(order);
      if (paymentMethod === "mercadopago") {
        window.open(data.init_point, "_blank");
      } else {
        window.open(data.href, "_blank");
      }
      console.log("Este es el data", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="grid grid-cols-1">
      {cart.length ? (
        <div className="max-w-6xl w-full mx-auto p-5">
          <form className="w-full">
            <table className="w-full">
              <tbody className="flex flex-col gap-2">
                {cart.map((event: any, index: number) => (
                  <tr
                    key={event.id}
                    className="bg-gray-50 flex flex-col  md:flex-row items-center"
                  >
                    <td className=" md:w-1/6 p-5">
                      <Link href={`/concerts/${event.id}`} className="max-w-32">
                        <img src={event.imgUrl} alt="Event.image" />
                      </Link>
                    </td>
                    <td className="w-4/6 p-5 text-center md:text-left">
                      <h3 className="font-bold text-lg">
                        {event.date} | {event.name}
                      </h3>
                      <p>{event.ticket.zone}</p>
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
                          <span className="line-through text-lg">
                            ${event.ticket.price * event.ticket.quantity}
                          </span>{" "}
                          <span className="text-red-600 text-lg">
                            $
                            {getPriceWithDiscount(
                              event.ticket.price,
                              event.id
                            ) * event.ticket.quantity}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg">
                          ${event.ticket.price * event.ticket.quantity}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex flex-col-reverse md:flex-row mt-4">
              <div className="w-full md:w-1/2 flex flex-col gap-2 p-5">
                <h1 className="font-bold text-xl">Métodos de pago</h1>
                <p className="text-sm">
                  Selecciona tu metodo de pago para continuar, si estas en
                  Argentina podras pagar con mercado pago
                </p>
                <div className="flex gap-4 justify-around mt-4">
                  <div className="w-28">
                    <input
                      type="radio"
                      id="paypal"
                      name="paymentMethod"
                      value="paypal"
                      className="hidden peer"
                      onChange={handlePaymentMethodChange}
                    />
                    <label
                      htmlFor="paypal"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-gray-100 bg-white p-4 cursor-pointer hover:bg-gray-100 peer-checked:border-gray-900"
                    >
                      <img src="/PayPal.png" alt="paypal" />
                    </label>
                  </div>
                  <div className="w-28">
                    <input
                      type="radio"
                      id="mercadopago"
                      name="paymentMethod"
                      value="mercadopago"
                      className="hidden peer"
                      onChange={handlePaymentMethodChange}
                    />
                    <label
                      htmlFor="mercadopago"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-gray-100 bg-white p-4 cursor-pointer hover:bg-gray-100  peer-checked:border-gray-900"
                    >
                      <img src="/mercadopago.webp" alt="mercadopago" />
                    </label>
                  </div>
                </div>
                <button
                  onClick={sendOrder}
                  className="bg-red-600 text-white p-2 mt-3 max-h-12 text-center text-base hover:bg-red-700 "
                >
                  IR A PAGAR
                </button>
              </div>
              <div className="flex flex-col p-5 gap-3 w-full md:w-1/2">
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
