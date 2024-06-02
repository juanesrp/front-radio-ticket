export interface IEvent {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  date: string;
  location: string;
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
