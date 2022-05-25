import type { IStock } from "./IStock";

export interface IPrice {
    id?: string;
    currentPrice: number;
    priceTime: Date;
    stockId:  string;
    stock:  IStock | null;
}