type METHOD = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type Options = {
    method?: METHOD;
    data?: any;
    timeout?: number;
    headers?: Record<string, string>;
};

function queryStringify(data: any) {
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
    get = (url: string, options: Options = {}) => {
        if (options.data) {
            url = `${url}${queryStringify(options.data)}`;
        }
        return this.request(
            url,
            { ...options, method: 'GET' },
            options.timeout
        );
    };

    put = (url: string, options: Options = {}) =>
        this.request(url, { ...options, method: 'PUT' }, options.timeout);

    post = (url: string, options: Options = {}) =>
        this.request(url, { ...options, method: 'POST' }, options.timeout);

    delete = (url: string, options: Options = {}) =>
        this.request(url, { ...options, method: 'DELETE' }, options.timeout);

    request = (url: string, options: Options, timeout: number = 5000) => {
        const { headers = {}, data, method } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            if (typeof method === 'string') {
                xhr.open(method, url);
            }

            xhr.timeout = timeout;

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = () => {
                resolve(xhr);
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
            } else {
                xhr.send(data);
            }
        });
    };
}
