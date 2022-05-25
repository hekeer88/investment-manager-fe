import type { IStock } from "./IStock";

export interface ITransaction {
    id?: string;
    quantity: number;
    transactionPrice: number;
    transactionDate: Date;
    type: string;
    stockId:  string;
    stock:  IStock | null;
}