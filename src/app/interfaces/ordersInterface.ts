import { IProduct } from "./products.Interfaces"

export interface Order {
    id: number;
    products: IProduct[];
    date: string;
    status: string;
}