import type { IStock } from "./IStock";

export interface ITransaction {
    id?: string;
    quantity: number;
    transactionPrice: number;
    transactionDate: Date;
    transactionType: number;
    stockId: string;
    stock:  IStock | null;

    

    
}

export enum TransactionType {
    Buy, 
    Sell, 
    Dividend, 
    Principle, 
    Interest 
}

