import { ApiResponse } from "@/interfaces/user";
import axios from "axios";
const api = process.env.NEXT_PUBLIC_API;

export const getUsers = async (page: number, limit: number) => {
    try {
        const userSesion = localStorage.getItem("userSession");
        let token: string | null = null;

        if (userSesion) {
            const userSesionToken = JSON.parse(userSesion);
            token = userSesionToken ? userSesionToken.token : null;
        } else {
            return { error: "No se encontró userSesion en el localStorage" };
        }

        if (!token) {
            return { error: "Token no encontrado en userSesion" };
        }
        const res = await axios.get(`${api}/user`, {
            params: {
                page,
                limit,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        return res.data
    } catch (error: any) {
        console.log("user error", error);

    }
}

export const putUser = async (id: string, isAdmin: boolean): Promise<ApiResponse> => {
    try {
        const userSesion = localStorage.getItem("userSession");
        let token: string | null = null;

        if (userSesion) {
            const userSesionToken = JSON.parse(userSesion);
            token = userSesionToken ? userSesionToken.token : null;
        } else {
            return { error: "No se encontró userSesion en el localStorage", data: null };
        }

        if (!token) {
            return { error: "Token no encontrado en userSesion", data: null };
        }

        const bodyData = {
            isAdmin: isAdmin
        };

        const res = await axios.put(`${api}/user/${id}`, bodyData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
        console.log(res);

        return res
    } catch (error: any) {
        console.log("user error", error);
        return { error: "Error al realizar la solicitud", data: null };
    }
}