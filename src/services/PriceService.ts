import type { IPrice } from "@/domain/IPrice";
import type { IStock } from "@/domain/IStock";
import type { ITransaction } from "@/domain/ITransaction";
import { BaseService } from "./BaseService";

export class PriceService extends BaseService<IPrice> {
    constructor() {
        super("prices");
    }
}
