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