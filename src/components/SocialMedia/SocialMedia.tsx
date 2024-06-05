import React from 'react';
import Link from 'next/link';

const SocialMedia = () => {
    return (
        <div className="flex justify-center">
            <div className="w-4/5 flex flex-col md:flex-row mt-8 mb-12">
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                    <Link href="Tu-URL-de-Instagram" target="_blank" rel="noopener noreferrer">
                        <div className="relative overflow-hidden">
                            <div className="relative">
                                <img
                                    src="/instagram.png"
                                    alt="Banner Instagram"
                                    className="w-full h-64 object-cover transition duration-500 ease-in-out"
                                />
                                <div className="absolute inset-0 bg-black opacity-0 transition duration-500 ease-in-out hover:opacity-50"></div>
                            </div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div className="flex flex-col items-center">
                                    <div className="bg-red-600 px-2 py-1 mb-1">
                                        <span className="text-white text-3xl">
                                            SIGUENOS EN
                                        </span>
                                    </div>
                                    <div className="bg-red-600 px-2 py-1">
                                        <span className="text-white text-3xl">
                                            INSTAGRAM
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="w-full md:w-1/2">
                    <Link href="Tu-URL-de-YouTube" target="_blank" rel="noopener noreferrer">
                        <div className="relative overflow-hidden">
                            <div className="relative">
                                <img
                                    src="/youtube.png"
                                    alt="Banner YouTube"
                                    className="w-full h-64 object-cover transition duration-500 ease-in-out"
                                />
                                <div className="absolute inset-0 bg-black opacity-0 transition duration-500 ease-in-out hover:opacity-50"></div>
                            </div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div className="flex flex-col items-center text-center">
                                    <div className="bg-red-600 px-2 py-1 mb-1 flex justify-center items-center">
                                        <span className="text-white text-3xl">
                                            SUSCRIBETE A
                                        </span>
                                    </div>
                                    <div className="bg-red-600 px-2 py-1 flex justify-center items-center">
                                        <span className="text-white text-3xl">
                                            NUESTRO CANAL
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SocialMedia;