import { Injectable } from "@nestjs/common";
import AxiosService from '../utils/axios/axiosService';
import AxiosInterceptor from "src/utils/axios/axiosInterceptor";



@Injectable()
export class HttpService {
    constructor() { }

    public static async headerBuilder() {
        const token = '123';
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

    public static async get(url: string, headers?: any): Promise<any> {
        headers = await this.headerBuilder();
        this.InjectMiddleware();
        return await AxiosService.get(url, headers);
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