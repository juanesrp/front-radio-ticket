import axios from "axios";
import { IEvent } from "@/interfaces";
const api = process.env.NEXT_PUBLIC_API;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE0Mjk4MzczLTM2NzQtNDA4MS1hZjUwLTI4ZmI5ODM2YTc3ZiIsImVtYWlsIjoieDhsOGNAZXhhbXBsZS5jb20iLCJpc0FkbWluIjpmYWxzZSwiaXNTdXBlckFkbWluIjp0cnVlLCJpYXQiOjE3MTcwNzk5NTQsImV4cCI6MTcxNzA4MzU1NH0.WdPoY7VWIe-hHaeQSnxFpIbsw-j_VMlFrUl9Ct23i5I";

export const getEvents = async (
  page: number,
  limit: number
): Promise<IEvent[]> => {
  try {
    const res = await axios.get<IEvent[]>(`${api}/events`, {
      params: {
        page,
        limit,
      },
    });
    const events = res.data;
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
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    };

    const res = await axios.post(`${api}/events`, eventData, config);
    return res.data;
  } catch (error: any) {
    return { error };
  }
};
