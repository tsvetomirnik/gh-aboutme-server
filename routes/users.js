'use strict';

var express = require('express');
var app = require('../app');
var githubApi = require('../github-api');
var cache = require('../cache');
var router = express.Router();

/* GET users listing. */
router.get('/:username', (req, res, next) => {
    const username = req.params.username;
    cache.getUser(username, (cachedUser) => {
        if (cachedUser) {
            console.log(`Response from cache for user ${username}.`);
            res.json(cachedUser);
        } else {
            console.log(`Response from github for user ${username}.`);
            githubApi.getUser(username, (user) => {
                cache.setUser(username, user, () => {
                    res.json(user);
                });
            });
        }
    });
});

module.exports = router;
