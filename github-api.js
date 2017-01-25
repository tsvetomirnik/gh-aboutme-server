'use strict';

var request = require('request');

var githubApi = {
    host: 'http://api.github.com',

    getUser: (username, callback) => {
        const requestUrl = githubApi.host + '/users/' + username;
        request({
            url: requestUrl,
            headers: {
                'User-Agent': 'node.js'
            }
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                callback(JSON.parse(body));
            }
        });
    },
};

module.exports = githubApi;