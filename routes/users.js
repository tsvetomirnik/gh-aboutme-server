"use strict";

const express = require("express");
const app = require("../app");
const cache = require("../cache");
const router = express.Router();
const GitHub = require("github-api");

const gh = new GitHub(app.get("config").gitHub);

/* GET user */
router.get("/:username", (req, res, next) => {
  const username = req.params.username;
  cache.getUser(username, (cachedUser) => {
    if (cachedUser) {
      console.log(`Response from cache for user ${username}.`);
      res.json(cachedUser);
    } else {
      console.log(`Response from github for user ${username}.`);
      const user = (await gh.getUser(username).getProfile()).data;
      cache.setUser(username, user, () => res.json(user));
    }
  });
});

module.exports = router;
