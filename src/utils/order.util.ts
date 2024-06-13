import axios from "axios";
const api = process.env.NEXT_PUBLIC_API;

export const createOrder = async (order: any) => {
  console.log("Estoy en el createOrder", order);

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
    const res = await axios.post(`${api}/orders`, order, config);
    console.log("Estoy en el createOrder", res.data);

    return res.data;
  } catch (error: any) {
    console.log(error);
  }
};

export const generateSubscription = async () => {
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

    const res = await axios.post(
      `${api}/orders/generatesubscription/PLAN MENSUAL`,
      {},
      config
    );

    console.log("Estoy en el generateSubscription", res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderByUser = async () => {
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
    const res = await axios.get(`${api}/orders/ofUser`, {
      headers: {

        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    console.log("🚀 ~ getOrderByUser ~ res:", res)
    return { data: res.data };
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
}