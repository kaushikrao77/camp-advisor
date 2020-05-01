var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
router.get("/", function(req, res) {
  res.render("landing");
});
router.get("/register", function(req, res) {
  res.render("register");
});
router.post("/register", function(req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      req.flash("error", err.message);
      return res.render("register");
    }
    req.login(user, function(err) {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to YelpCamp " + user.username + " !!");
      return res.redirect("/campgrounds");
    });
    // passport.authenticate("local")(req, res, function() {
    //   req.flash("success", "Welcome to YelpCamp " + user.username + " !!");
    //   res.redirect("/campgrounds");
    // });
  });
});

router.get("/login", function(req, res) {
  res.render("login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: "Invalid username or password so back off",
    successFlash: "Welcome!"
  }),
  function(req, res) {}
);
router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/campgrounds");
});
module.exports = router;
