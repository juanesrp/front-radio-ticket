/* eslint-disable @next/next/no-img-element */
import React from 'react'

const We = () => {
    return (
        <>
            <h1 className='my-5 text-center font-bold text-2xl'>EQUIPO DEL PROYECTO</h1>
            <div className='flex md:flex-row flex-col gap-3 md:justify-center items-center'>

                <div className='flex gap-3 text-center text-xs font-bold'>
                    <div className='bg-gray-100 px-3 pb-2 pt-1 shadow-md hover:bg-gray-200 transition duration-300'>
                        <img src="/agus.jpg" alt="agus" className='h-24 rounded-[100%]' />
                        <span>AGUSTIN</span>
                        <div className='flex justify-center gap-2'>
                            <a href="https://github.com/AgustinCruz03" target="_blank"><img src="/github.svg" alt="github" className='h-6 hover:opacity-75' /></a>
                            <a href="https://www.linkedin.com/in/agustin-alexis-cruz/" target="_blank"><img src="/linkedin.svg" alt="linkedin" className='h-7 hover:opacity-75' /></a>
                        </div>
                    </div>
                    <div className='bg-gray-100 px-3 pb-2 pt-1 shadow-md hover:bg-gray-200 transition duration-300'>
                        <img src="/said.jpg" alt="said" className='h-24 rounded-[100%]' />
                        <span>SAID</span>
                        <div className='flex justify-center gap-2'>
                            <a href="https://github.com/AljureS" target="_blank"><img src="/github.svg" alt="github" className='h-6 hover:opacity-75' /></a>
                            <a href="https://www.linkedin.com/in/webdeveloper-saljure/" target="_blank"><img src="/linkedin.svg" alt="linkedin" className='h-7 hover:opacity-75' /></a>
                        </div>
                    </div> 
                    <div className='bg-gray-100 px-3 pb-2 pt-1 shadow-md hover:bg-gray-200 transition duration-300'>
                        <img src="/luis.jpg" alt="luis" className='h-24 rounded-[100%]' />
                        <span>LUIS</span>
                        <div className='flex justify-center gap-2'>
                            <a href="https://github.com/LuisRGN" target="_blank"><img src="/github.svg" alt="github" className='h-6 hover:opacity-75' /></a>
                            <a href="https://www.linkedin.com/in/luis-gonzalez-nu%C3%B1ez-049076290/" target="_blank"><img src="/linkedin.svg" alt="linkedin" className='h-7 hover:opacity-75' /></a>
                        </div>
                    </div>
                </div>

                <div className='flex gap-3 text-center text-xs font-bold'>
                    <div className='bg-gray-100 px-3 pb-2 pt-1 shadow-md hover:bg-gray-200 transition duration-300'>
                        <img src="/juan.jpg" alt="juan" className='h-24 rounded-[100%]' />
                        <span>JUAN</span>
                        <div className='flex justify-center gap-2'>
                            <a href="https://github.com/juanesrp" target="_blank"><img src="/github.svg" alt="github" className='h-6 hover:opacity-75' /></a>
                            <a href="https://www.linkedin.com/in/juanestebanrendonpechene/" target="_blank"><img src="/linkedin.svg" alt="linkedin" className='h-7 hover:opacity-75' /></a>
                        </div>
                    </div>
                    <div className='bg-gray-100 px-3 pb-2 pt-1 shadow-md hover:bg-gray-200 transition duration-300'>
                        <img src="/ale.jpg" alt="ale" className='h-24 rounded-[100%]' />
                        <span>ALEJANDRA</span>
                        <div className='flex justify-center gap-2'>
                            <a href="https://github.com/SAlejandraOlaya" target="_blank"><img src="/github.svg" alt="github" className='h-6 hover:opacity-75' /></a>
                            <a href="https://www.linkedin.com/in/silvia-alejandra-olaya-forero-961993308/" target="_blank"><img src="/linkedin.svg" alt="linkedin" className='h-7 hover:opacity-75' /></a>
                        </div>
                    </div>
                    <div className='bg-gray-100 px-3 pb-2 pt-1 shadow-md hover:bg-gray-200 transition duration-300'>
                        <img src="/lucas.jpg" alt="lucas" className='h-24 rounded-[100%]' />
                        <span>LUCAS</span>
                        <div className='flex justify-center gap-2'>
                            <a href="https://github.com/LucasNicolasOcana" target="_blank"><img src="/github.svg" alt="github" className='h-6 hover:opacity-75' /></a>
                            <a href="https://www.linkedin.com/in/lucas-oca%C3%B1a/" target="_blank"><img src="/linkedin.svg" alt="linkedin" className='h-7 hover:opacity-75' /></a>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default We