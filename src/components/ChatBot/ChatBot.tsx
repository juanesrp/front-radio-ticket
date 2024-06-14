/* eslint-disable @next/next/no-img-element */
"use client";
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

type Message = {
    text: string;
    sender: 'bot' | 'user';
};

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const chatRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<Message[]>([
        { text: 'Hola, ¿en qué puedo ayudarte?', sender: 'bot' }
    ]);


    const handleUserMessage = (message: string) => {
        setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'user' }]);
        setTimeout(() => {
            let botResponse = '';
            switch (message) {
                case '¿Dónde llegan mis boletos?':
                    botResponse = 'Tus boletos llegarán al correo electrónico que proporcionaste al momento de la compra.';
                    break;
                case '¿Dónde me puedo hacer premium?':
                    botResponse = 'Puedes convertirte en usuario premium accediendo a la sección de "Mi Cuenta" y seleccionando "Hacerme Premium".';
                    break;
                case '¿Qué beneficios tiene ser premium?':
                    botResponse = 'Siendo usuario premium, obtienes acceso a eventos exclusivos, descuentos especiales y atención prioritaria.';
                    break;
                default:
                    botResponse = 'Lo siento, no puedo ayudarte en este momento.';
            }
            setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'bot' }]);
        }, 1000);
    };

    const handleOptionClick = (option: string) => {
        handleUserMessage(option);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    const options = [
        '¿Dónde llegan mis boletos?',
        '¿Dónde me puedo hacer premium?',
        '¿Qué beneficios tiene ser premium?'
    ];

    return (
        <div className="fixed bottom-5 right-5" ref={chatRef}>
            <div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-red-600 hover:bg-red-700 transition duration-300 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-md fixed bottom-5 right-5"
                >
                    <img src="/chat.svg" alt="chat" className='h-7'/>
                </button>
            </div>
            {isOpen && (
                <div className="fixed bottom-20 right-5 w-[22rem] bg-white p-4 rounded-lg" style={{ boxShadow: "0 0.1rem 0.2rem #00000033, 0 0.1rem 0.5rem #0000004d, 0 0.2rem 1.5rem #00000066"}}>
                    <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccccccab', padding: '10px' }}>
                        {messages.map((message, index) => (
                            <div key={index} style={{ textAlign: message.sender === 'bot' ? 'left' : 'right', marginBottom: '1rem' }}>
                                <span style={{ padding: '5px', backgroundColor: message.sender === 'bot' ? '#f0f0f0' : '#ee1818', color: message.sender === 'bot' ? '#000' : '#fff' }}>
                                    {message.text}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-2">
                        {options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                className="w-full mt-2 p-2 bg-red-600 hover:bg-red-700 transition duration-300 text-white rounded-md"
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




