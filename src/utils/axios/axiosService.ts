import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

class AxiosService {

    static urlBuilder(baseUrl: string, trailingUrl: string) {
        return `${baseUrl}/${trailingUrl}`;
    }

    static get(
        url: string,
        config?: AxiosRequestConfig | undefined,
    ): Promise<AxiosResponse<any>> {
        return axios.get(url, config);
    }

    static post(
        url: string,
        data?: any,
        config?: AxiosRequestConfig | undefined,
    ): Promise<AxiosResponse<any>> {
        return axios.post(url, data, config);
    }

    static put(
        url: string,
        data?: any,
        config?: AxiosRequestConfig | undefined,
    ): Promise<AxiosResponse<any>> {
        return axios.put(url, data, config);
    }

    static patch(
        url: string,
        data?: any,
        config?: AxiosRequestConfig | undefined,
    ): Promise<AxiosResponse<any>> {
        return axios.patch(url, data, config);
    }

    static delete(
        url: string,
        config?: AxiosRequestConfig | undefined,
    ): Promise<AxiosResponse<any>> {
        return axios.delete(url, config);
    }

    static all(values: any[]): Promise<any[]> {
        return axios.all(values);
    }

}

export default AxiosService;
