'use strict';

let app = require('./app');
let storage = app.get('storage');

var cache = {
    _getUserKey: (username) => {
        return 'users/' + username;
    },

    _isUserExpired: (record) => {
        const hours = Math.abs((new Date()).getTime() - (new Date(record.createdAt)).getTime()) / 36e5;
        return hours > 24;
    },

    setUser: (username, user, callback) => {
        const key = cache._getUserKey(username);

        let record = {
            data: user,
            createdAt: new Date()
        };

        storage.setItem(key, record, (err) => {
            callback();
        });
    },

    getUser: (username, callback) => {
        const key = cache._getUserKey(username);

        storage.getItem(key, (err, record) => {
            if (record && !cache._isUserExpired(record)) {
                callback(record.data);
            } else {
                callback(null);
            }
        });
    },

};

module.exports = cache;