import { HTTPTransportResponseType } from './apiTypes';

type METHOD = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type HttpHeaders = {
    [key: string]: string;
};

type HttpMethod = <T = any, R = HTTPTransportResponseType<T>>(
    url: string,
    options?: Options
) => Promise<R>;

type BodyInit = Blob | BufferSource | FormData | URLSearchParams | string;

export type Options = {
    timeout?: number;
    headers?: HttpHeaders;
    method?: METHOD;
    data?:
        | Record<string, any>
        | Document
        | BodyInit
        | XMLHttpRequestBodyInit
        | null
        | undefined;
    credentials?: boolean;
};

export function queryStringify(data: any) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }
    const stringified = Object.entries(data)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    return `?${stringified}`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class HTTPTransport {
    private defaultHeaders = {
        accept: 'application/json',
        'Content-Type': 'application/json',
    } as const;

    get: HttpMethod = (url, options = {} as Options) => {
        if (options.data) {
            url = `${url}${queryStringify(options.data)}`;
        }
        return this.request(url, { ...options, method: 'GET' });
    };

    put: HttpMethod = (url, options = {} as Options) =>
        this.request(url, { ...options, method: 'PUT' });

    post: HttpMethod = (url, options = {} as Options) =>
        this.request(url, { ...options, method: 'POST' });

    delete: HttpMethod = (url, options = {} as Options) =>
        this.request(url, { ...options, method: 'DELETE' });

    request = (url: string, options: Options): Promise<any> => {
        const {
            timeout = 5000,
            headers = this.defaultHeaders,
            data,
            method,
        } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            if (typeof method === 'string') {
                xhr.open(method, url);
            }

            xhr.timeout = Number(timeout);
            xhr.withCredentials = true;

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = () => {
                let response: Record<string, any> | string;
                const isJson = xhr
                    .getResponseHeader('Content-Type')
                    ?.includes('application/json');
                if (isJson) {
                    response = {
                        status: xhr.status,
                        data: JSON.parse(xhr.responseText),
                    };
                } else {
                    response = { status: xhr.status, data: xhr.responseText };
                }

                resolve(response);
            };
            xhr.onabort = () => {
                reject();
            };

            xhr.onerror = () => {
                reject();
            };
            xhr.ontimeout = () => {
                reject();
            };

            if (method === 'GET' || !data) {
                xhr.send();
            } else if (method === 'PUT' && data) {
                xhr.send(data as any);
            } else if (typeof data !== 'string') {
                xhr.send(JSON.stringify(data));
            } else {
                xhr.send(data);
            }
        });
    };
}

export default new HTTPTransport();
