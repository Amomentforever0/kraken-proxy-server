export default class Api {
    constructor() {
        this.xhr = null;
    }

    static fetchDataFromEndpoint(endpoint) {
        return new Promise((resolve, reject) => {
            this.xhr = new XMLHttpRequest();
            this.xhr.open('GET', endpoint, true);
            this.xhr.send();
            this.xhr.onreadystatechange = () => {
                if(this.xhr.readyState === 4 && this.xhr.status === 200) {
                    resolve(JSON.parse(this.xhr.responseText));
                } else if(this.xhr.status !== 200) {
                    reject(new Error('Cannot fetch data...'));
                }
            };
        });
    }

    static postDataForEndpoint(endpoint) {

    }
}