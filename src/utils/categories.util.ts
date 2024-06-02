import { ICategory } from "@/interfaces";
import axios from "axios";
const api = process.env.NEXT_PUBLIC_API;

export const getCategories = async () => {
  try {
    const res = await axios.get(`${api}/categories`);
    const categories: ICategory[] = res.data;
    console.log("Estoy en el getCategories: ", categories);

    return categories;
  } catch (error: any) {
    throw new Error(error);
  }
};
