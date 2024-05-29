export interface IEvent {
  id: number;
  name: string;
  description: string;
  image: string;
  date: string;
  category: {
    id: number;
    name: string;
  };
  tickets: {
    id: number;
    stock: number;
    price: number;
    zone: string;
  }[];
}
