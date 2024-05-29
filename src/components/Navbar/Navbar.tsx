"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isVisible || isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="bg-black ">
        <div className="text-white text-base flex justify-between items-center p-3 max-w-7xl mx-auto sm:border-b border-[#374151]">
          <div className="min-[769px]:hidden cursor-pointer" onClick={toggleModal}>
            menu
          </div>
          <div>
            <Link href={"/"}>
              <img src="/logo2.png" alt="radioticket" className="h-28 " />
            </Link>
          </div>
          <div className="flex gap-1 items-center">
            {isVisible ? (
              <div ref={searchRef}>
                <input
                  type="search"
                  className="bg-[#3b3b3bd5] text-white max-[768px]:hidden rounded"
                />
              </div>
            ) : (
              <button onClick={toggleSearch} className="max-[768px]:hidden">
                buscar
              </button>
            )}
            carrito
          </div>
        </div>
        <div
          className={`${isFixed
            ? "fixed top-0 left-0 right-0 bg-black max-w-full z-50"
            : "relative"
            }`}
        >
          <div className="text-[#ffffff9b] pr-5 pl-2 flex justify-between max-w-7xl mx-auto max-[768px]:hidden">
            <div className="py-5 text-base">
              <Link href={"/"}>
                <span
                  className={`p-4 hover:text-white transition duration-300 ${pathname === "/"
                    ? "text-white border-b-[6px] border-red-500"
                    : ""
                    }`}
                >
                  INICIO
                </span>
              </Link>
              <Link href={"/concerts"}>
                <span
                  className={`p-4 hover:text-white transition duration-300 ${pathname === "/concerts"
                    ? "text-white border-b-[6px] border-red-500"
                    : ""
                    }`}
                >
                  PROXIMOS EVENTOS
                </span>
              </Link>
              <Link href={"/about"}>
                <span
                  className={`p-4 hover:text-white transition duration-300 ${pathname === "/about"
                    ? "text-white border-b-[6px] border-red-500"
                    : ""
                    }`}
                >
                  ACERCA DE LA PAGINA
                </span>
              </Link>
              <Link href={"/contact"}>
                <span
                  className={`p-4 hover:text-white transition duration-300 ${pathname === "/contact"
                    ? "text-white border-b-[6px] border-red-500"
                    : ""
                    }`}
                >
                  CONTACTO
                </span>
              </Link>
            </div>
            <div className="py-5 text-xs flex items-center">
              {isFixed &&
                (isVisible ? (
                  <div ref={searchRef}>
                    <input
                      type="search"
                      className="bg-[#3b3b3bd5] text-white rounded h-[1.5rem]"
                    />
                  </div>
                ) : (
                  <button onClick={toggleSearch} className="hover:text-white">
                    buscar
                  </button>
                ))}
              <Link href={"/dashAdmi"}>
                <span
                  className={`p-4 hover:text-white transition duration-300 ${pathname === "/DashAdmin" ? "text-white" : ""
                    }`}
                >
                  CUENTA
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 transition-opacity lg:hidden z-50 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={sidebarRef}
          className={`w-64 h-screen bg-[#1f1c1cfa] p-4 flex flex-col gap-2 items-center transition-transform transform lg:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <input type="search" className="bg-[#3b3b3bd5] text-white rounded w-9/12" />
          <div className="flex flex-col gap-4 items-center text-[#ffffff9b] text-lg">
            <Link href={"/"}>
              <span className="hover:text-white transition duration-300">INICIO</span>
            </Link>
            <Link href={"/concerts"}>
              <span className="hover:text-white transition duration-300">PROXIMOS EVENTOS</span>
            </Link>
            <Link href={"/about"}>
              <span className="hover:text-white transition duration-300">ACERCA DE LA PAGINA</span>
            </Link>
            <Link href={"/contact"}>
              <span className="hover:text-white transition duration-300">CONTACTO</span>
            </Link>
            <Link href={"/dashAdmi"}>
              <span className="hover:text-white transition duration-300">CUENTA</span>
            </Link>
          </div>
          <button
            onClick={toggleModal}
            className="mt-4 bg-[#d8232f] text-white p-2 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </>
  );
};
