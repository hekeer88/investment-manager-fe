export interface ILoan {
    id?: string;
    name: string;
    loanName:  string;
    borrowerName:  string;
    contractNumber:  string;
    collateral:  string;
    endDate:  Date;
    amount:  number;
    scheduleType:  string;
    interest:  number;
    portfolioId:  string;
    portfolioName:  string;
    regionId:  string;
    country:  string;
    continent: string;
}