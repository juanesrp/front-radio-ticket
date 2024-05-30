"use client"
import { postEvent } from '@/utils/events.util';
import React, { useState } from 'react';

const FormNewEvent = () => {
    const [input, setInput] = useState({
        name: "",
        description: "",
        imgUrl: "",
        category: "",
        date: "",
        location: '',
        tickets: [{ price: "", stock: "", zone: "" }],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        });
    };

    const handleTicketChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newTickets = input.tickets.map((ticket, i) => 
            i === index ? { ...ticket, [name]: value } : ticket
        );
        setInput({
            ...input,
            tickets: newTickets
        });
    };

    const handleAddTicket = () => {
        setInput({
            ...input,
            tickets: [...input.tickets, { price: "", stock: "", zone: "" }]
        });
    };

    const handleRemoveTicket = (index: number) => {
        setInput({
            ...input,
            tickets: input.tickets.filter((_, i) => i !== index)
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const eventData = {
            ...input,
            tickets: input.tickets.map(ticket => ({
                ...ticket,
                price: parseFloat(ticket.price),
                stock: parseInt(ticket.stock)
            }))
        };
        const result = await postEvent(eventData);
        console.log(eventData);
        console.log(result);
    };

    return (
        <>
            <div className='flex flex-col items-center my-12'>
                <form className='max-w-md w-full flex flex-col bg-gray-100 px-6 py-8 rounded-md shadow-md' onSubmit={handleSubmit}>
                    <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>Crear nuevo evento</h2>
                    
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='text-gray-600 my-2'>Nombre del evento</label>
                        <input type="text" id='name' name='name' className='rounded-md' value={input.name} onChange={handleChange}/>   
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="description" className='text-gray-600 my-2'>Descripción del evento</label>
                        <input type="text" id='description' name='description' className='rounded-md' value={input.description} onChange={handleChange}/>
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="imgUrl" className='text-gray-600 my-2'>Poster del evento</label>
                        <input type="text" id='imgUrl' name='imgUrl' className='rounded-md' value={input.imgUrl} onChange={handleChange}/>
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="category" className='text-gray-600 my-2'>Categoría del evento</label>
                        <input type="text" id='category' name='category' className='rounded-md' value={input.category} onChange={handleChange}/>
                    </div>

                    <div className='flex flex-col'> 
                        <label htmlFor="date" className='text-gray-600 my-2'>Fecha del evento</label>
                        <input type="date" id='date' name='date' className='rounded-md' value={input.date} onChange={handleChange}/>
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="location" className='text-gray-600 my-2'>Ubicación del evento</label>
                        <input type="text" id='location' name='location' className='rounded-md' value={input.location} onChange={handleChange}/>
                    </div>

                    <span className='text-gray-600 my-2'>Tickets</span>

                    {input.tickets.map((ticket, index) => (

                        <div key={index} className='flex flex-col border border-gray-300 p-4 my-2 rounded-md'>

                            <div className='flex flex-col'>
                                <label htmlFor={`stock-${index}`} className='text-gray-600 my-2'>Cantidad</label>
                                <input type="number" id={`stock-${index}`} name='stock' className='rounded-md' value={ticket.stock} onChange={e => handleTicketChange(index, e)}/>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor={`price-${index}`} className='text-gray-600 my-2'>Precio</label>
                                <input  type="number" id={`price-${index}`} name='price' className='rounded-md' value={ticket.price} onChange={e => handleTicketChange(index, e)}/>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor={`zone-${index}`} className='text-gray-600 my-2'>Zona</label>
                                <select className='rounded-md'  value={ticket.zone}  id={`zone-${index}`}  name='zone' onChange={e => handleTicketChange(index, e)}>   
                                    <option>Elige una zona</option>
                                    <option value="General">General</option>
                                    <option value="VIP">VIP</option>
                                </select>
                            </div>

                            <div className='flex justify-center'>
                            <button type="button"  onClick={() => handleRemoveTicket(index)} 
                                className='bg-gray-500 text-white font-semibold py-1 mt-2 rounded-md w-64 hover:bg-gray-600 transition duration-200 cursor-pointer'
                            >Eliminar ticket
                            </button>
                            </div>
                        </div>
                    ))}

                    <div className='flex justify-center'>
                    <button type="button" onClick={handleAddTicket} 
                        className='bg-red-500 text-white font-semibold py-2 mt-4 rounded-md w-64 hover:bg-red-600 transition duration-200 cursor-pointer'
                    >Agregar ticket
                    </button>
                    </div>

                    <div className='flex justify-center'>
                        <input 
                            type="submit" 
                            value="Enviar" 
                            className='bg-red-500 text-white font-semibold py-2 mt-4 rounded-md w-64 hover:bg-red-600 transition duration-200 cursor-pointer'/> 
                    </div>
                </form> 
            </div>
        </>
    );
};

export default FormNewEvent;