const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json({ message: 'Logged in successfully' });
    });
  })(req, res, next);
});

router.get('/protected', (req, res) => {
    if (req.isAuthenticated()) {
      return res.json({ message: 'You are authenticated!' });
    }
    return res.status(401).json({ message: 'You are not authenticated!' });
  });
  
module.exports = router;
