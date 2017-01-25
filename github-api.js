'use strict';

var request = require('request');

class GitHubApi {

    constructor(options) {
        this.host = 'http://api.github.com';
        this.clientID = options.clientID;
        this.clientSecret = options.clientSecret;
    }

    getClientParams() {
        var params = '';
        if (this.clientID && this.clientSecret) {
            params = `?client_id=${this.clientID}&client_secret=${this.clientSecret}`;
        }
        return params;
    }

    getUser(username, callback) {
        const requestUrl = `${this.host}/users/${username}` + this.getClientParams();
        request({
            url: requestUrl,
            headers: {
                'User-Agent': 'node.js'
            }
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                callback(error, response, body);
            }
        });
    }
}

module.exports = (options) => {
    return new GitHubApi(options)
};