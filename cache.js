"use strict";

const app = require("./app");
const storage = app.get("storage");

const cache = {
  _getUserKey: (username) => {
    return `users/${username}`;
  },

  _hasRecordCacheExpired: (record) => {
    const now = new Date();
    const createdDate = new Date(record.createdAt);
    const hoursDiff = Math.abs(now.getTime() - createdDate.getTime()) / 3600000;
    return hoursDiff > 24;
  },

  setUser: (username, user, callback) => {
    const key = this._getUserKey(username);

    const record = {
      data: user,
      createdAt: new Date(),
    };

    storage.setItem(key, record, () => callback());
  },

  getUser: (username, callback) => {
    const key = this._getUserKey(username);

    storage.getItem(key, (err, record) => {
      if (record && !this._hasRecordCacheExpired(record)) {
        callback(record.data);
      } else {
        callback(null);
      }
    });
  },
};

module.exports = cache;
