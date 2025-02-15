const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const express = require('express');
const googleAuth = require('../dal/google-auth.dal');
const router = express.Router();
require('dotenv').config();

let userProfile;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

// request at /auth/google, when user click sign-up with google button transferring
// the request to google server, to show emails screen
router.get(
  '/',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// URL Must be same as 'Authorized redirect URIs' field of OAuth client, i.e: /auth/google/callback
router.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google/error' }),
  (req, res) => {
    //res.redirect('/auth/google/success'); // Successful authentication, redirect success.
    // Redirect to success route with a query parameter indicating success
    res.redirect('/auth/google/success?redirect=' + encodeURIComponent(req.session.originalUrl || '/'));
  }
);

router.get('/success', async (req, res) => {
  const { failure, success } = await googleAuth.registerWithGoogle(userProfile);
  if (failure) console.log('Google user already exist in DB...');
  else console.log('Registering new Google user...');
  //res.render('success', { user: userProfile });

  // Check if the user is an admin
  const user = await googleAuth.findUserById(userProfile.id); // Assuming this function fetches the user from the database
  userProfile.isAdmin = user.isAdmin;
  // if (userProfile.isAdmin === 'true') {
  //   res.render('admin-success', { user: userProfile });
  // } else {
  //   res.render('success', { user: userProfile });
  // }
  //res.render('success', { user: userProfile });
  const redirectUrl = req.query.redirect || '/';
  res.send(`<script>
    if (window.opener) {
                window.opener.location.href = '${redirectUrl}';
                window.close();
              } else {
                window.location.href = '${redirectUrl}';
              }
            </script>`);
});

router.get('/error', (req, res) => res.send('Error logging in via Google...'));

router.get('/signout', (req, res) => {
  try {
    req.session.destroy(function (err) {
      console.log('Session destroyed...');
    });
    //res.render('auth');
    res.redirect('/');
  } catch (err) {
    res.status(400).send({ message: 'Failed to sign out user' });
  }
});

module.exports = router;
