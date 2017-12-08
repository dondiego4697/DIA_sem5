export function request(address = '', headers = {}, type = 'GET', body) {
    let fetchObj = {
        method: type,
        headers: headers,
        credentials: 'include'
    };
    if (body) {
        fetchObj.body = JSON.stringify(body);
    }

    return new Promise((resolve, reject) => {
        let result;
        fetch(address, fetchObj).then(response => {
            result = {
                redirected: response.redirected,
                url: response.url,
                status: response.status
            };
            if (response.redirected) {
                return {};
            }
            return response.json();
        }).then(json => {
            result.json = json;
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
}