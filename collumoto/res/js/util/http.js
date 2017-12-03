export function request(address = '', headers = {}, type = 'GET', body = {}) {
    let fetchObj = {
        method: type,
        headers: headers,
        credentials: 'include'
    };
    if (body) {
        fetchObj.body = JSON.stringify(body);
    }

    return new Promise((resolve, reject) => {
        fetch(address, fetchObj).then(response => {
            return {
                json: response.json(),
                redirected: response.redirected,
                url: response.url,
                status: response.status
            }
        }).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err);
        });

    });
}