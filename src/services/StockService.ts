import type { IStock } from "@/domain/IStock";
import { BaseService } from "./BaseService";

export class StockService extends BaseService<IStock> {
    constructor() {
        super("stocks");
    }
}
