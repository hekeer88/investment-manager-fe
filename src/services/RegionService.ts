import type { IRegion } from "@/domain/IRegion";
import { BaseService } from "./BaseService";

export class RegionService extends BaseService<IRegion> {
    constructor() {
        super("regions");
    }
}
