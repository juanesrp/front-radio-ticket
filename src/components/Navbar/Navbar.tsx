/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { UserData } from "@/interfaces/userData";
import { useUser, UserProfile } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import { ICartItem } from "@/interfaces";
import { refresh } from "@/utils/refresh";
import { BiCheck, BiError, BiLogOutCircle } from "react-icons/bi";
import { toast } from "sonner";
import { getSearch } from "@/utils/events.util";
import { useSearchContext } from "@/context/SearchContext";
const api = process.env.NEXT_PUBLIC_API;

const protectedRoutes = ["/dashMyUser", "/dashAdmi"];

export const Navbar = () => {
  const { searchKeyword, setSearchKeyword } = useSearchContext();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<UserData | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const pathname = usePathname();
  const jwt = require("jsonwebtoken");
  const { user } = useUser();
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  console.log("Es premium:", isPremium);

  useEffect(() => {
    const sendUser = async (user: UserProfile) => {
      try {
        const res = await axios.post(`${api}/auth/auth0`, user);
        if (res.status === 201) {
          const { token } = res.data;
          // Decodificar el token
          const decodedToken = jwt.decode(token);
          const userSession = {
            token: token,
            name: decodedToken.name,
            email: decodedToken.email,
            isAdmin: decodedToken.isAdmin,
            isSuperAdmin: decodedToken.isSuperAdmin,
            isPremium: decodedToken.isPremium,
          };
          localStorage.setItem("userSession", JSON.stringify(userSession));

          if (userSession) {
            setAuthUser(userSession);
            setIsPremium(userSession.isPremium);
            if (!decodedToken.isPremium) {
              localStorage.setItem("showSubscriptionModal", "true");
            }
            toast("Te has logeado correctamente", {
              icon: <BiCheck style={{ color: "green", fontSize: "50px" }} />,
            });
          }
        } else {
          toast(res.data.message, {
            icon: <BiError style={{ color: "red", fontSize: "50px" }} />,
          });
        }
      } catch (error: any) {
        console.error("Error sending user:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast("Error: " + error.response.data.message, {
            icon: <BiError style={{ color: "red", fontSize: "50px" }} />,
          });
        } else {
          toast("An unexpected error occurred.", {
            icon: <BiError style={{ color: "red", fontSize: "50px" }} />,
          });
        }
      }
    };
    const token = localStorage.getItem("userSession");
    if (!token && user?.sid) {
      sendUser(user);
    }
  }, [user?.sid]);

  const token = user?.idToken;

  const search = async (keyword: string) => {
    try {
      const res = await getSearch(keyword);
      setSearchResults(res);
    } catch (error: any) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    if (e.target.value) {
      search(e.target.value);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/concerts?keyword=${searchKeyword}`);
    }
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (isOpen) {
          setIsOpen(false);
        }
        if (isVisible) {
          setIsVisible(false);
          // Agregar la lógica de redirección aquí
          router.push(`/concerts?keyword=${searchKeyword}`);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isVisible, searchKeyword, router]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
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

    const params = new URLSearchParams(window.location.search);
    console.log("Estoy en params", params);

    if (params.get("success") === "true") {
      console.log("Estoy en success");

      localStorage.removeItem("cart");
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const userSessionString = localStorage.getItem("userSession");
    const userSession = userSessionString
      ? JSON.parse(userSessionString)
      : null;
    if (userSession) {
      setAuthUser(userSession);
      setIsPremium(userSession.isPremium);
    } else if (protectedRoutes.includes(pathname)) {
      router.push("/login");
    }
  }, [pathname, router]);

  const homePath = authUser
    ? authUser.isSuperAdmin
      ? "/dashSuperAdmin"
      : authUser.isAdmin
      ? "/dashAdmi"
      : "/dashMyUser"
    : "/login";

  useEffect(() => {
    const checkTokenExpiration = async () => {
      try {
        await refresh(); // Intenta actualizar el token
        console.log("Token refreshed successfully");
      } catch (error: any) {
        if (error.message === "Token expired") {
          console.error("Token expired, logging out user...");
          toast("Sesión cerrada", {
            icon: <BiLogOutCircle style={{ color: "red", fontSize: "50px" }} />,
          });
          localStorage.removeItem("userSession");
          localStorage.removeItem("cart");
          window.location.href = "/api/auth/logout";
        } else {
          console.error("Failed to refresh token:", error);
        }
      }
    };
    checkTokenExpiration();
  }, []);

  const handleLogout = () => {
    toast(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>¿Estás seguro? Vas a cerrar sesión</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "0.5rem",
          }}
        >
          {[
            {
              label: "Sí",
              onClick: () => {
                toast("Sesión cerrada");
                localStorage.removeItem("userSession");
                localStorage.removeItem("cart");
                window.location.href = "/api/auth/logout";
              },
            },
            {
              label: "No",
              onClick: () => {
                toast.dismiss();
              },
            },
          ].map((action) => (
            <button
              key={action.label}
              onClick={action.onClick}
              className={`log-out ${action.label === "Sí" ? "yes" : "no"}`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    );
  };
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log(storedCart);

    setCart(storedCart);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="bg-black">
        <div
          className={`${
            isFixed
              ? "max-[768px]:fixed max-[768px]:top-0 max-[768px]:left-0 max-[768px]:right-0 max-[768px]:bg-black max-[768px]:max-w-full max-[768px]:z-50"
              : "relative"
          }`}
        >
          <div className="text-white text-base flex justify-between items-center px-3 max-w-7xl mx-auto sm:border-b border-[#374151]">
            <div
              className="min-[769px]:hidden cursor-pointer"
              onClick={toggleModal}
            >
              <img src="/menu.svg" alt="menu" className="h-9" />
            </div>
            <div>
              <Link href={"/"}>
                {isPremium ? (
                  <img
                    src="/logoPremiun2.png"
                    alt="radioticket"
                    className="h-20"
                  />
                ) : (
                  <img src="/logo2.png" alt="radioticket" className="h-20" />
                )}
              </Link>
            </div>
            <div className="flex gap-1 items-center">
              {isVisible ? (
                <div ref={searchRef}>
                  <input
                    type="search"
                    className="bg-[#3b3b3bd5] text-white max-[768px]:hidden rounded"
                    value={searchKeyword}
                    onChange={handleSearchInputChange}
                    onKeyPress={handleSearchKeyPress}
                  />
                </div>
              ) : (
                <button onClick={toggleSearch} className="max-[768px]:hidden">
                  <img src="/search.svg" alt="buscador" className="h-7" />
                </button>
              )}
              <Link href="/cart" className="relative">
                <img src="/shop.svg" alt="carrito" className="h-8" />
                {cart.length > 0 && (
                  <span className="absolute top-2 right-1 bg-red-600 rounded-full w-3 h-3 flex justify-center items-center text-xs"></span>
                )}
              </Link>
            </div>
          </div>
        </div>
        <div
          className={`${
            isFixed
              ? "fixed top-0 left-0 right-0 bg-black max-w-full z-50"
              : "relative"
          }`}
        >
          <div className="text-[#ffffff9b] pr-5 pl-2 flex justify-between max-w-7xl mx-auto max-[768px]:hidden">
            <div className="py-5 text-sm">
              <Link href={"/"}>
                <span
                  className={`p-4 hover:text-white transition duration-300 ${
                    pathname === "/"
                      ? "text-white border-b-[6px] border-red-600"
                      : ""
                  }`}
                >
                  INICIO
                </span>
              </Link>
              <Link href={"/concerts"}>
                <span
                  className={`p-4 hover:text-white transition duration-300 ${
                    pathname === "/concerts"
                      ? "text-white border-b-[6px] border-red-600"
                      : ""
                  }`}
                >
                  PROXIMOS EVENTOS
                </span>
              </Link>
              <Link href={"/about"}>
                <span
                  className={`p-4  hover:text-white transition duration-300 ${
                    pathname === "/about"
                      ? "text-white border-b-[6px] border-red-600"
                      : ""
                  }`}
                >
                  ACERCA DE LA PAGINA
                </span>
              </Link>
              <Link href={"/contact"}>
                <span
                  className={`p-4 hover:text-white transition duration-300 ${
                    pathname === "/contact"
                      ? "text-white border-b-[6px] border-red-600"
                      : ""
                  }`}
                >
                  CONTACTO
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              {isFixed &&
                (isVisible ? (
                  <div ref={searchRef}>
                    <input
                      type="search"
                      className="bg-[#3b3b3bd5] text-white rounded h-[1.5rem]"
                      value={searchKeyword}
                      onChange={handleSearchInputChange}
                      onKeyPress={handleSearchKeyPress}
                    />
                  </div>
                ) : (
                  <button onClick={toggleSearch} className="hover:text-white">
                    <img src="/search.svg" alt="carrito" className="h-7 pr-1" />
                  </button>
                ))}
              {authUser ? (
                <div className="hover:text-white transition duration-300 cursor-pointer pr-5">
                  <span onClick={handleLogout} className="text-[0.8rem]">
                    CERRAR SESION
                  </span>
                </div>
              ) : (
                ""
              )}
              <Link href={homePath}>
                <span className=" hover:text-white  transition duration-300">
                  {authUser ? (
                    <span className="text-[0.8rem]">
                      {authUser.name.toLocaleUpperCase()}
                    </span>
                  ) : (
                    <img src="/avatar.svg" alt="avatar" className="h-7" />
                  )}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 transition-opacity lg:hidden z-50 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={sidebarRef}
          className={`w-64 h-screen bg-[#1f1c1cfa] p-4 flex flex-col gap-2 items-center transition-transform transform lg:hidden ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <input
            type="search"
            className="bg-[#3b3b3bd5] text-white rounded w-9/12"
            value={searchKeyword}
            onChange={handleSearchInputChange}
            onKeyPress={handleSearchKeyPress}
          />
          <div className="flex flex-col gap-4 items-center text-[#ffffff9b] text-lg">
            <Link href={"/"}>
              <span className="hover:text-white transition duration-300">
                INICIO
              </span>
            </Link>
            <Link href={"/concerts"}>
              <span className="hover:text-white transition duration-300">
                PROXIMOS EVENTOS
              </span>
            </Link>
            <Link href={"/about"}>
              <span className="hover:text-white transition duration-300">
                ACERCA DE LA PAGINA
              </span>
            </Link>
            <Link href={"/contact"}>
              <span className="hover:text-white transition duration-300">
                CONTACTO
              </span>
            </Link>
            <Link href={homePath}>
              <span className="p-4 hover:text-white transition duration-300">
                {authUser ? authUser.name.toLocaleUpperCase() : "CUENTA"}
              </span>
            </Link>
            {authUser ? (
              <div className="hover:text-white transition duration-300 cursor-pointer">
                <span onClick={handleLogout}>CERRAR SESION</span>
              </div>
            ) : (
              ""
            )}
          </div>
          <button
            onClick={toggleModal}
            className="mt-4 bg-red-600 text-white p-2 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
