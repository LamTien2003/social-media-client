export interface ResponseApi<T = any> extends Response {
    status: number;
    data: {
        status: string;
        message?: string;
        accessToken?: string;
        data?: T;
    };
}
