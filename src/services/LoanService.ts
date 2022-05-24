import type { ILoan } from "@/domain/ILoan";
import { BaseService } from "./BaseService";

export class LoanService extends BaseService<ILoan> {
    constructor() {
        super("loans");
    }
}
