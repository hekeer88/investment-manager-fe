import type { IStock } from "@/domain/IStock";
import httpCLient from "@/http-client";
import type { AxiosError } from "axios";
import { BaseService } from "./BaseService";
import { IdentityService } from "./IdentityService";

export class StockService extends BaseService<IStock> {
    constructor() {
        super("stocks");
    }

    override async getAll(): Promise<IStock[]> {
        console.log("getAll Stocks");
        try {
            let response = await httpCLient.get(`/stocks`, {
                headers: {
                    "Authorization": "bearer " + this.identityStore.$state.jwt?.token        
                }
                
            });
            console.log(response);

            let res = response.data as IStock[];
            res.forEach(async stock => {
                await this.put(stock.id!, stock);
                console.log("BALANCE", stock.balance);
            });
            return res;
        } catch (e) {
            let response = (e as AxiosError).response!;
            if (response.status == 401 && this.identityStore.jwt) {
                let identityService = new IdentityService();
                let refreshResponse = await identityService.refreshIdentity();
                this.identityStore.$state.jwt = refreshResponse.data!;

                if (!this.identityStore.$state.jwt) return [];
                

                let response = await httpCLient.get(`/stocks`, {
                    headers: {
                        "Authorization": "bearer " + this.identityStore.$state.jwt?.token
                    }
                });
                console.log(response);
    
                let res = response.data as IStock[];
                
                return res;

            }

        }
        return [];
    }
}
