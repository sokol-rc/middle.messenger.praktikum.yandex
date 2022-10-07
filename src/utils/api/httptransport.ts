enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

type Options = {
    method?: string;
    data?: any;
    timeout?: number;
    headers?: Record<string, string>;
};

function queryStringify(data: any) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }
    let out = '?';
    Object.keys(data).forEach((key) => {
        out += `${key}=${data[key]}&`;
    });
    out = out.slice(0, -1);
    return out.replace(/ /g, '%20');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class HTTPTransport {
    get = (url: string, options: Options = {}) => {
        if (options.data) {
            url = `${url}${queryStringify(options.data)}`;
        }
        return this.request(
            url,
            { ...options, method: METHOD.GET },
            options.timeout
        );
    };

    put = (url: string, options: Options = {}) =>
        this.request(url, { ...options, method: METHOD.PUT }, options.timeout);

    post = (url: string, options: Options = {}) =>
        this.request(url, { ...options, method: METHOD.POST }, options.timeout);

    delete = (url: string, options: Options = {}) =>
        this.request(
            url,
            { ...options, method: METHOD.DELETE },
            options.timeout
        );

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

            if (method === METHOD.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
