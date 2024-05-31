import axios from "axios";
import { IEvent } from "@/interfaces";
const api = process.env.NEXT_PUBLIC_API;

export const getEvents = async (
    page: number,
    limit: number
): Promise<IEvent[]> => {
    try {
        const res = await axios.get(`${api}/events`, {
            params: {
                page,
                limit,
            },
        });
        const events: IEvent[] = res.data.events;
        console.log("Estoy en el getEvents: ", events);
        return events;
    } catch (error: any) {
        throw new Error("Ocurrio un error: ", error);
    }
};

export const getEventById = async (id: string) => {
    try {
        const res = await fetch(`${api}/events/${id}`);
        const event: IEvent = await res.json();
        return event;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const postEvent = async (eventData: {
    name: string;
    description: string;
    imgUrl: string;
    category: string;
    date: string;
    location: string;
    tickets: {
        price: number;
        stock: number;
        zone: string;
    }[];
}) => {
    try {
        const userSesion = localStorage.getItem('userSession')
        let token: string | null = null

        if (userSesion) {
            const userSesionToken = JSON.parse(userSesion)
            token = userSesionToken ? userSesionToken.token : null;
        } else {
            return { error: "No se encontró userSesion en el localStorage" }
        }

        if (!token) {
            return { error: "Token no encontrado en userSesion" }
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const res = await axios.post(`${api}/events`, eventData, config);
        return res.data;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.message };
        }
        return { error: "Error desconocido al crear el evento" };
    }
}
