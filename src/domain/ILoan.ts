export interface ILoan {
    id?: string;
    loanName:  string;
    borrowerName:  string;
    contractNumber:  string;
    collateral:  string;
    loanDate:  Date;
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