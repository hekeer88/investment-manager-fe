import type { IJWTResponse } from "@/domain/IJWTResponse";
import httpCLient from "@/http-client";
import { useIdentityStore } from "@/stores/identity";
import type { AxiosError } from "axios";
import { data } from "jquery";
import type { IServiceResult } from "./IServiceResult";

export class IdentityService {
    identityStore = useIdentityStore();

    async login(email: string, password: string): Promise<IServiceResult<IJWTResponse>> {
        try {
            let loginInfo = {
                email,
                password
            }
            let response = await httpCLient.post("/identity/account/login", loginInfo);
            return {
                status: response.status,
                data: response.data as IJWTResponse
            };

        } catch (e) {
            let response = {
                status: (e as AxiosError).response!.status,
                errorMsg: (e as AxiosError).response!.data.error,
            }

            console.log(response);

            console.log((e as AxiosError).response);

            return response;
        }



    }

    async refreshIdentity(): Promise<IServiceResult<IJWTResponse>> {
        try {

            let response = await httpCLient.post("/identity/account/refreshtoken",
                {
                    jwt: this.identityStore.$state.jwt?.token,
                    refreshToken: this.identityStore.$state.jwt?.refreshToken
                }
            );
            return {
                status: response.status,
                data: response.data as IJWTResponse
            };

        } catch (e) {
            let response = {
                status: (e as AxiosError).response!.status,
                errorMsg: (e as AxiosError).response!.data.error,
            }

            console.log(response);

            console.log((e as AxiosError).response);

            return response;
        }
    }
}