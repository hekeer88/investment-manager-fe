import type { IPortfolio } from "@/domain/IPortfolio";
import httpCLient from "@/http-client";
import { BaseService } from "./BaseService";

export class PortfolioService extends BaseService<IPortfolio> {
    constructor() {
        super("portfolios");
    }
}
