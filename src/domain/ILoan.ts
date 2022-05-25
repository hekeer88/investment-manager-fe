import type { IPortfolio } from "./IPortfolio";
import type { IRegion } from "./IRegion";

export interface ILoan {
    id?: string;
    loanName:  string;
    borrowerName:  string;
    contractNumber:  string;
    collateral:  boolean;
    loanDate:  Date;
    endDate:  Date;
    amount:  number;
    scheduleType:  string;
    interest:  number;
    portfolioId:  string;
    portfolio:  IPortfolio | null;
    regionId:  string;
    region:  IRegion | null;
}