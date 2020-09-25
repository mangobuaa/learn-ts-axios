import { AxiosRequestConfig } from "./types";

export default function xhr (config: AxiosRequestConfig): void {
    const { data=null, url, method='get' } = config;        // 解构赋值，并配置默认值

    const request = new XMLHttpRequest();

    request.open(method.toUpperCase(), url, true);
    request.send(data);
    
}