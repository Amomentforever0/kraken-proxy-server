export default class Api {
    constructor() {
        this.xhr = null;
    }

    static fetchDataFromEndpoint(endpoint) {
        return new Promise((resolve, reject) => {
            this.xhr = new XMLHttpRequest();
            this.xhr.open('GET', endpoint, true);
            this.xhr.send();
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