/* eslint-disable @next/next/no-img-element */
"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
const api = process.env.NEXT_PUBLIC_API;

const AQUI = `${api}/subscription`;

type Message = {
  text: string | JSX.Element;
  sender: "bot" | "user";
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<"initial" | "secondary">("initial");
  const [selectedOption, setSelectedOption] = useState<
    keyof typeof secondaryOptions | null
  >(null);
  const pathname = usePathname();
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    { text: "Hola, ¿en qué puedo ayudarte?", sender: "bot" },
  ]);

  const handleUserMessage = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: "user" },
    ]);
    setTimeout(() => {
      let botResponse: string | JSX.Element = "";
      switch (message) {
        case "¿Dónde llegan mis tickets?":
          botResponse =
            "Tus tickets llegarán al correo electrónico asociado con el que te registraste.";
          break;
        case "¿Dónde me puedo hacer premium?":
          botResponse = (
            <>
              Puedes convertirte en usuario premium accediendo{" "}
              <Link
                href="/subscription"
                className="text-red-600 hover:text-red-700 transition duration-300"
              >
                ¡AQUI!
              </Link>
              . Recuerda que debes iniciar sesión para ingresar.
            </>
          );
          break;
        case "¿Qué beneficios tiene ser premium?":
          botResponse =
            "Como usuario premium, tienes la ventaja de comprar los tickets días antes de su lanzamiento.";
          break;
        case "¿Cómo puedo mostrar mi ticket?":
          botResponse =
            "Puedes mostrar tu ticket revisando el PDF enviado, el cual contiene todos los detalles junto con un código QR.";
          break;
        case "¿Cuándo llegarán mis tickets?":
          botResponse =
            "Tus tickets deberían llegar de inmediato después de confirmar la compra.";
          break;
        case "¿Cuánto cuesta ser premium?":
          botResponse = "La suscripción premium cuesta $2.98 al mes.";
          break;
        case "¿Qué método de pago aceptan?":
          botResponse = "Aceptamos PayPal.";
          break;
        case "¿Por qué comprar los tickets antes del lanzamiento?":
          botResponse =
            "Al comprar tus tickets antes del lanzamiento general, puedes encontrar mejores ubicaciones y aprovechar descuentos al momento de la compra.";
          break;
        case "¿Qué descuentos se ofrecen?":
          botResponse =
            "Como usuario premium, puedes obtener descuentos en ciertos eventos.";
          break;
        case "Volver a las opciones principales":
          setStage("initial");
          setSelectedOption(null);
          return;
        default:
          botResponse = "Lo siento, no puedo ayudarte en este momento.";
      }
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, sender: "bot" },
      ]);
    }, 1000);
  };

  const handleOptionClick = (option: string) => {
    if (stage === "initial") {
      setSelectedOption(option as keyof typeof secondaryOptions);
      setStage("secondary");
    }
    handleUserMessage(option);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Función para hacer scroll hacia abajo al agregar nuevos mensajes
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    scrollToBottom(); // Llama la función al inicio para hacer scroll al final

    // Scroll automático al agregar nuevos mensajes
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const initialOptions = [
    "¿Dónde llegan mis tickets?",
    "¿Dónde me puedo hacer premium?",
    "¿Qué beneficios tiene ser premium?",
  ];

  const secondaryOptions = {
    "¿Dónde llegan mis tickets?": [
      "¿Cuándo llegarán mis tickets?",
      "¿Cómo puedo mostrar mi ticket?",
      "Volver a las opciones principales",
    ],
    "¿Dónde me puedo hacer premium?": [
      "¿Cuánto cuesta ser premium?",
      "¿Qué método de pago aceptan?",
      "Volver a las opciones principales",
    ],
    "¿Qué beneficios tiene ser premium?": [
      "¿Por qué comprar los tickets antes del lanzamiento?",
      "¿Qué descuentos se ofrecen?",
      "Volver a las opciones principales",
    ],
  };

  const options =
    stage === "initial"
      ? initialOptions
      : selectedOption
      ? secondaryOptions[selectedOption] || []
      : [];

  return (
    <div className="fixed bottom-5 right-5" ref={chatRef}>
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-red-600 hover:bg-red-700 transition duration-300 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-md fixed bottom-5 right-5"
        >
          <img src="/chat.svg" alt="chat" className="h-7" />
        </button>
      </div>
      {isOpen && (
        <div
          className="fixed bottom-20 right-5 w-[22rem] bg-gray-50 p-4 rounded-sm"
          style={{
            boxShadow:
              "0 0.1rem 0.2rem #00000033, 0 0.1rem 0.5rem #0000004d, 0 0.2rem 1.5rem #00000066",
          }}
        >
          <div
            style={{
              height: "300px",
              overflowY: "scroll",
              border: "1px solid #ccccccab",
              padding: "10px",
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  textAlign: message.sender === "bot" ? "left" : "right",
                  marginBottom: "1rem",
                }}
              >
                <span
                  style={{
                    padding: "5px",
                    backgroundColor:
                      message.sender === "bot" ? "#e8e8e8" : "#ee1818",
                    color: message.sender === "bot" ? "#000" : "#fff",
                  }}
                >
                  {message.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="mt-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="w-full mt-2 p-2 bg-red-600 hover:bg-red-700 transition duration-300 text-white"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
