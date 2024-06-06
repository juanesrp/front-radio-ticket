import axios, { AxiosResponse } from "axios";
import { IEvent, IEventResponse } from "@/interfaces";
import { log } from "console";
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

export const getEventsOfAdmin = async (): Promise<IEventResponse> => {
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
    const res = await axios.get(`${api}/events/ofadmin`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    const events: IEvent[] = res.data;
    return events;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.data.message === "Invalid token") {
        return { error: "Invalid token" }
      }
      return { error: error.response.data.message };
    }
    throw new Error("Ocurrio un error: " + error);
  }
};

export const getEventById = async (id: string) => {
  try {
    const res = await axios.get(`${api}/events/${id}`);
    const event: IEvent = res.data;
    console.log("🚀 ~ getEventById ~ event:", event)
    return event;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getEventsByDate = async (
  page: number,
  limit: number,
  order: string,
  category?: string
) => {
  try {
    console.log("Estoy en el getEventsByDate: ", category);

    const res = await axios.get(`${api}/events/date`, {
      params: {
        page,
        limit,
        category,
        order,
      },
    });
    console.log("Estoy en el getEventsByDate: ", res.data.events);

    const events: IEvent[] = res.data.events;
    return events;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getEventsByAZ = async (
  order: string,
  page: number,
  limit: number,
  category?: string
) => {
  try {
    console.log("Estoy en el getEventsByAZ: ", category);

    const res = await axios.get(`${api}/events/alphabetical`, {
      params: {
        order,
        page,
        limit,
        category,
      },
    });
    const events: IEvent[] = res.data.events;
    return events;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getEventsByPrice = async (
  order: string,
  page: number,
  limit: number,
  category?: string
) => {
  try {
    console.log("Estoy en el getEventsByPrice: ", category);

    const res = await axios.get(`${api}/events/price`, {
      params: {
        order,
        page,
        limit,
        category,
      },
    });
    const events: IEvent[] = res.data;
    return events;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getEventsByCategory = async (
  page: number,
  limit: number,
  category: string
) => {
  try {
    const res = await axios.get(`${api}/events/bycategory`, {
      params: {
        page,
        limit,
        category,
      },
    });
    console.log("Estoy en el getEventsByCategory", res.data.data);
    const events: IEvent[] = res.data.data;
    return events;
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
      if (error.response.data.message === "Invalid token") {
        return { error: "Invalid token" }
      }
      return { error: error.response.data.message };
    }
    return { error: "Error desconocido al crear el evento" };
  }
};

export const postImage = async (formData: FormData): Promise<AxiosResponse<any, any> | { error: string; }> => {
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
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(`${api}/cloudinary`, formData, config);
    return res
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.data.message === "Invalid token") {
        return { error: "Invalid token" }
      }
      const axiosError = error;
      if (axiosError.response && axiosError.response.status === 400) {
        return { error: "La imagen es demasiado grande" };
      }
    }
    return { error: "Error al subir la imagen" };
  }
}