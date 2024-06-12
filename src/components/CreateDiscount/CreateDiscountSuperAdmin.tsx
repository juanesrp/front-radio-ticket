"use client"
import { Discount, IEvent } from '@/interfaces'
import { getDiscountId, postDiscount } from '@/utils/discount.util'
import { formatDate } from '@/utils/formatDate'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const CreateDiscountSuperAdmin = ({ event }: { event: IEvent }) => {
  const [discount, setDiscount] = useState('');
  const [allDiscount, setAllDiscount] = useState<Discount[]>([])

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscount(e.target.value);
  };

  useEffect(() => {
    const getAllDiscount = async (id: string) => {
      try {
        const res = await getDiscountId(id)
        setAllDiscount(res || [])
      } catch (error: any) {
        throw new Error(error);
      }
    }
    if (event.id) {
      getAllDiscount(event.id);
    }
  }, [event.id])


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const discountValue = parseInt(discount, 10);
    if (isNaN(discountValue) || discountValue < 10 || discountValue > 100) {
      alert('El valor del descuento debe estar entre 10 y 100');
    } else {
      try {
        const res = await postDiscount(event.id, discountValue);
        const newDiscount = res.data;
        const updatedDiscounts = await getDiscountId(event.id);
        setAllDiscount(updatedDiscounts || []);
        console.log("🚀 ~ handleSubmit ~ res:", res)
        alert(`Se creó un descuento con el ${discountValue}%`);
        setDiscount('');
      } catch (error) {
        console.error('Error al crear el descuento:', error);
        alert('Hubo un error al crear el descuento. Por favor, inténtalo de nuevo más tarde.');
      }
    }

  }

  return (
    <>
      <div className='bg-gray-50'>
        <div className='flex md:flex-row flex-col max-[768px]:items-center md:justify-between py-10 max-w-4xl mx-auto'>
          <div>
            <img src={event.imgUrl} alt={event.name} className="w-full max-w-96" />
          </div>
          <div className='flex flex-col mt-5 lg:w-[28rem]'>
            <span className='text-3xl font-bold'>
              {`${formatDate(event.date)} | ${event.name}`}
            </span>
            <span>
              {event.tickets.map((ticket) => (
                <span key={ticket.id}>
                  <div className='flex flex-col my-3'>
                    <span>
                      <span className='font-bold'>Zona:</span> {ticket.zone}
                    </span>
                    <span>
                      <span className='font-bold'>Precio:</span> {`$${ticket.price}`}
                    </span>
                  </div>

                </span>
              ))}
            </span>
            <form className='flex flex-col' onSubmit={handleSubmit}>
              <label htmlFor="discount" className='text-[0.7rem] font-bold p-2'>DESCUENTO</label>
              <div className='flex justify-around'>
                <input type="number" name="discount" id="discount" className='w-40 rounded' value={discount}
                  onChange={handleDiscountChange} />
                <button className='bg-red-600 text-white p-2 max-h-12  text-center text-sm hover:bg-red-700'>AGREGAR DESCUENTO</button>
              </div>

            </form>
            <div className='flex flex-col mt-5 border-2'>
              <h3 className='text-center border-2 font-bold'>DESCUENTOS CREADOS</h3>
              {allDiscount.length > 0 ? (
                <div>
                  {allDiscount.map((discount) => (
                    discount ? (
                      <div key={discount.id}>
                        <div className='flex justify-evenly border-2'>
                          <div className='flex flex-col items-center w-screen border-r-2'>
                           <span className='font-bold'>Descuento</span> 
                          <span>{discount.discount}%</span> 
                          </div>
                          <div className='flex flex-col items-center  w-screen border-l-2'>
                           <span className='font-bold'>Código</span>
                          <span>{discount.code}</span> 
                          </div>
                        </div>
                        
                      </div>
                    ) : null
                  ))}
                </div>
              ): (<span className='text-center border-2'>No hay descuentos todavia</span>)}
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center text-3xl p-9'>
        <Link href={"/dashSuperAdmin"} className='hover:text-red-600 transition duration-300'>VOLVER AL PERFIL</Link>
      </div>
    </>
  )
}

export default CreateDiscountSuperAdmin