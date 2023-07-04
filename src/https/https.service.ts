import { Injectable } from "@nestjs/common";
import AxiosService from '../utils/axios/axiosService';
import AxiosInterceptor from "src/utils/axios/axiosInterceptor";
import QueryString from "qs";



@Injectable()
export class HttpService {
    constructor() { }

    public static async headerBuilder() {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYW4uc2hhaEBleGFtcGxlLmNvbSIsInJvbGUiOiJidXNpbmVzc19hZG1pbiIsImV4cCI6MTY5MzM5MzI4Nn0.Jzyg9ZP5cqmebrHV4zlKMifB93rRDbWlKSTcaVsb7X0';
        const headers = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        return headers;
    }

    public static async delete(url: string): Promise<any> {
        const headers = await this.headerBuilder();
        this.InjectMiddleware();
        return await AxiosService.delete(url, headers);
    }

    public static async get(url: string, params?: any): Promise<any> {
        const { headers } = await this.headerBuilder();
        this.InjectMiddleware();
        return await AxiosService.get(url, {
            headers, params
        });
    }

    public static async post(
        url: string,
        data: any,
        headers?: any,
    ): Promise<any> {
        headers = await this.headerBuilder();
        this.InjectMiddleware();
        return await AxiosService.post(url, data, headers);
    }

    public static async put(
        url: string,
        data?: any,
        headers?: any,
    ): Promise<any> {
        headers = await this.headerBuilder();
        this.InjectMiddleware();
        return await AxiosService.put(url, data, headers);
    }

    public static async patch(
        url: string,
        data?: any,
        headers?: any,
    ): Promise<any> {
        headers = await this.headerBuilder();
        this.InjectMiddleware();
        return await AxiosService.patch(url, data, headers);
    }


    public static async xRequests(requests: any[]): Promise<any[]> {
        this.InjectMiddleware();
        return await AxiosService.all(requests);
    }

    private static InjectMiddleware() {
        this.SubscribeRequestInterceptor();
        this.SubscribeResponseInterceptor();
    }

    private static SubscribeRequestInterceptor() {
        AxiosInterceptor.subscribeRequest();
    }

    private static SubscribeResponseInterceptor() {
        AxiosInterceptor.subscribeResponse();
    }

}