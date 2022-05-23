export interface IStock {
    id?: string;
    company: string;
    ticker: string;
    comment: string;
    regionId: string | null;
    portfolioId: string;
    industryId: string | null;
}