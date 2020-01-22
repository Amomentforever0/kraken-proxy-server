export default class Api {
    constructor() {}

    static fetchDataFromEndpoint(endpoint) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', endpoint, true);
            request.send();
            request.onreadystatechange = () => {
                if(request.readyState === 4 && request.status === 200) {
                    resolve(JSON.parse(request.responseText));
                } else if(request.status !== 200) {
                    reject(new Error('Cannot fetch data...'));
                }
            };
        });
    }

    static postDataForEndpoint(endpoint) {

    }
}