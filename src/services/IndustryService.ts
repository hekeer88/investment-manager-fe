import type { IIndustry } from "@/domain/IIndustry";
import { BaseService } from "./BaseService";

export class IndustryService extends BaseService<IIndustry> {
    constructor() {
        super("industries");
    }
}
