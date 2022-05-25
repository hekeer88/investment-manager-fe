import type { IStock } from "@/domain/IStock";
import type { ITransaction } from "@/domain/ITransaction";
import { BaseService } from "./BaseService";

export class TransactionService extends BaseService<ITransaction> {
    constructor() {
        super("transactions");
    }
}
