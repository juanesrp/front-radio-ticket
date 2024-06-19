export interface Order {
    id: string;
    event: {
        id: string;
        name: string;
        date: string;
        description: string;
        imgUrl: string;
    };
    isUsed: boolean;
    userId: string;
    zone: string;
}