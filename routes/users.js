'use strict';

var express = require('express');
var app = require('../app');
var gitHubApi = require('../github-api')(app.get('config').gitHub);
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
            gitHubApi.getUser(username, (error, response, body) => {
                console.log(`Rate limit: ${response.headers['x-ratelimit-remaining']} of ${response.headers['x-ratelimit-limit']} remains.`);
                let user = JSON.parse(body);
                cache.setUser(username, user, () => {
                    res.json(user);
                });
            });
        }
    });
});

module.exports = router;
