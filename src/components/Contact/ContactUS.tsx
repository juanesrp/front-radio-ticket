"use client";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Icontact } from "@/interfaces/contact";
import { useState } from "react";
import { BiError, BiMessageCheck } from "react-icons/bi";
import { toast } from "sonner";

const ContactUS: React.FC = () => {
  const formRef = useRef(null);
  const contactData = {
    user_name: "",
    user_phone: "",
    user_email: "",
    message: "",
  };

  const [contactUser, setcontactUser] = useState<Icontact>(contactData);

  const resetForm = () => {
    setcontactUser(contactData);
  };

  const validateForm = () => {
    const { user_name, user_phone, user_email, message } = contactUser;
    return user_name && user_phone && user_email && message;
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      emailjs
        .sendForm(
          "service_3qbk83h",
          "template_0xd67cl",
          formRef.current!,
          "AUNwRQMlnlRuv3kDR"
        )
        .then(
          (result) => {
            toast("Correo electrónico enviado.", {
              icon: (
                <BiMessageCheck
                  style={{
                    color: "green",
                    fontSize: "40px",
                  }}
                />
              ),
              duration: 1000,
            });
            resetForm();
          },
          (error) => {
            toast("Error al enviar correo electrónico.", {
              icon: <BiError style={{ color: "red", fontSize: "40px" }} />,
            });
          }
        );
    } else {
      toast("Por favor, complete todos los campos.", {
        icon: <BiError style={{ color: "red", fontSize: "40px" }} />,
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setcontactUser({
      ...contactUser,
      [event.target.name]: event.target.value,
    });
  };
  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setcontactUser({
      ...contactUser,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form ref={formRef} onSubmit={sendEmail}>
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-16 mb-16">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          CONTACTO
        </h2>
        <p className="mb-6 text-xl">
          Para resolver todas tus dudas sobre nuestros productos y eventos deja
          tus datos para poder comunicarnos contigo.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="nombre"
              className="text-gray-700 font-semibold mb-2 block text-xl"
            >
              Nombre
            </label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              value={contactUser.user_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-md"
            />
          </div>
          <div>
            <label
              htmlFor="nombre"
              className="text-gray-700 font-semibold mb-2 block text-xl"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              value={contactUser.user_email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-md "
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="telefono"
            className="text-gray-700 font-semibold mb-2 block text-xl"
          >
            Número de teléfono
          </label>
          <input
            type="number"
            id="user_phone"
            name="user_phone"
            value={contactUser.user_phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-md "
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="mensaje"
            className="text-gray-700 font-semibold mb-2 block text-xl"
          >
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            value={contactUser.message}
            onChange={handleTextAreaChange}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-md "
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            value="Send"
            className="w-96 py-2 px-3 mt-6 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300 text-xl"
          >
            ENVIAR
          </button>
        </div>
      </div>
    </form>
  );
};
export default ContactUS;
