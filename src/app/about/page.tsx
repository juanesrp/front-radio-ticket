import Slice from '@/components/Slider/Slider'
import We from '@/components/We/We'
import React from 'react'

const page = () => {
  return (
    <>
    <div className='flex flex-col gap-2 p-9 bg-gray-50'>
      <h1 className='text-center font-semibold text-xl'>¡Hola a todos!</h1>
      <p className='text-center font-semibold'>Somos un equipo de 6 apasionados por la música y la tecnología,
         y estamos emocionados de presentarles Radioticket. 
         Nuestra plataforma no solo vende tickets de eventos musicales, 
         sino que también representa nuestra fusión de pasiones y 
         habilidades. Desde el diseño hasta la implementación, 
         hemos dedicado cada paso del proceso a crear una experiencia 
         fluida y emocionante. Explora nuestra página para descubrir 
         cómo conectamos a artistas y fanáticos de una manera 
         significativa y eficiente.</p>
         <span className='text-center font-semibold'>¡Gracias por unirte a nuestro emocionante viaje!</span>
    </div>
    <We/>
    <Slice/>
    </>
  )
}

export default page