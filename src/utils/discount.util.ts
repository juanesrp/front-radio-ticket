import { Discount } from "@/interfaces";
import axios from "axios";
const api = process.env.NEXT_PUBLIC_API;

export const getDiscount = async (code: string) => {
  try {
    const res = await axios.get(`${api}/discount/verify`, {
      params: { code },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const postDiscount = async (id: string, discount: number) => {
  const bodyData = {
    discount: discount
  }
  try {
    const res = await axios.post(`${api}/discount/create/${id}`, bodyData)
    return res.data
  } catch (error: any) {
    throw new Error(error);
  }
}

export const getDiscountId = async (id: string): Promise<Discount[]> => {
  try {
    const res = await axios.get(`${api}/discount/${id}`)
    console.log("🚀 ~ getDiscountId ~ res:", res)
    return res.data
  } catch (error: any) {
    throw new Error(error);
  }
}