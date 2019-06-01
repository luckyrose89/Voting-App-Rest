"use strict";

var passport = require("passport"),
  TwitterTokenStrategy = require("passport-twitter-token"),
  User = require("mongoose").model("User");

module.exports = function() {
  passport.use(
    new TwitterTokenStrategy(
      {
        consumerKey: "j4fSytOnp6A7PCnPVG1koBcZK",
        consumerSecret: "IVBU1FmBQTh6FXxLGshwYkNlgIaFbG4uqJi7VyPlbLF6ihMAdg"
      },
      function(token, tokenSecret, profile, done) {
        User.upsertTwitterUser(token, tokenSecret, profile, function(
          err,
          user
        ) {
          return done(err, user);
        });
      }
    )
  );
};
