import type { IIndustry } from "./IIndustry";
import type { IPortfolio } from "./IPortfolio";
import type { IRegion } from "./IRegion";

export interface IStock {
    id?: string;
    company: string;
    ticker: string;
    comment: string | null;

    regionId: string | null;
    region: IRegion | null;

    portfolioId: string;
    portfolio: IPortfolio | null;

    industryId: string | null;
    industry: IIndustry | null;
}