export interface IEvent {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  date: string;
  address: string;
  latitude: string;
  longitude: string;
  userEmail: string | null;
  ticketId: string;
  category: {
    id: string;
    name: string;
  };
  tickets: {
    id: string;
    stock: number;
    price: number;
    zone: string;
  }[];
}

export interface ICategory {
  id: string;
  name: string;
}

export type IEventResponse = IEvent[] | { error: string };
export interface ICartItem {
  id: string;
  imgUrl: string;
  date: string;
  name: string;
  ticket: {
    id: string;
    price: number;
    zone: string;
    quantity: number;
  };
}

export interface CreateDiscountProps {
  events: IEvent[];
}

export interface DiscuontResponse {
  data: {
    code: string
    discount: number
  }
}
