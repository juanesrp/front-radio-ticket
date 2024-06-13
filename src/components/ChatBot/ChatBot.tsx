"use client";
import React, { useState } from 'react';

type Message = {
    text: string;
    sender: 'bot' | 'user';
};

const Chatbot = () => {
    const [messages, setMessages] = useState<Message[]>([
        { text: 'Hola, ¿en qué puedo ayudarte?', sender: 'bot' }
    ]);
    const [isOpen, setIsOpen] = useState(false);

    const handleUserMessage = (message: string) => {
        setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'user' }]);
        // Aquí podrías agregar lógica para la respuesta del chatbot
        setTimeout(() => {
            setMessages((prevMessages) => [...prevMessages, { text: 'Lo siento, no puedo ayudarte en este momento.', sender: 'bot' }]);
        }, 1000); // Simulación de respuesta del bot después de 1 segundo
    };

    const handleOptionClick = (option: string) => {
        handleUserMessage(option);
    };

    const options = ['Consulta 1', 'Consulta 2', 'Consulta 3'];

    return (
        <div className="fixed bottom-5 right-5">
            <div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-md fixed bottom-5 right-5"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
            </div>
            {isOpen && (
                <div className="fixed bottom-20 right-5 w-64 bg-white p-4 rounded-lg shadow-md">
                    <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                        {messages.map((message, index) => (
                            <div key={index} style={{ textAlign: message.sender === 'bot' ? 'left' : 'right', marginBottom: '5px' }}>
                                <span style={{ padding: '5px', borderRadius: '5px', backgroundColor: message.sender === 'bot' ? '#f0f0f0' : '#007bff', color: message.sender === 'bot' ? '#000' : '#fff' }}>
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
                                className="w-full mt-2 p-2 bg-red-500 text-white rounded-md focus:outline-none focus:ring focus:border-blue-500"
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



