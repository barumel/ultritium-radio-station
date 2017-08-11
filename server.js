const Express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const RadioStream = require('ultritium-radio-stream');
const express = Express();
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const mongoose   = require('mongoose');
const _ = require('lodash');
const cors = require('cors');

const StreamService = require('./lib/service/stream/stream');
const PlaylistService = require('./lib/service/playlist/playlist');
const PlaylistItemService = require('./lib/service/playlistitem/playlistitem');
const AuthService = require('./lib/service/auth/auth');

const AuthenticateMiddleware = require('./lib/service/auth/middleware/authenticate');

const User = require('./lib/model/user');

mongoose.connect('mongodb://localhost:27017/radiostation');


passport.use(new BearerStrategy((token, next) => {
  User.findOne({ token: token }, (err, result) => {
    console.log(result);
    if (err) return next(err);
    if (!result) return next (new Error('No valid token'));

    return next(result, {});
  });
}));

express.use(cookieParser());
express.use(bodyParser.urlencoded({ extended: true }));
express.use(bodyParser.json());
express.use(cors());
express.use(passport.initialize());

const port = process.env.PORT || 8090;

const router = Express.Router();

//express.use(passport.authenticate('bearer', { session: false }));
//express.use(AuthenticateMiddleware.handle());

router.post('/auth', (req, res, next) => {
  AuthService.handle('POST', req, res, next);
});

router.delete('/auth', (req, res, next) => {
  AuthService.handle('DELETE', req, res, next);
});

router.get('/stream/:type/:playlistId', (req, res, next) => {
  StreamService.handle('GET', req, res, next);
});

router.get('/playlist', (req, res, next) => {
  PlaylistService.handle('ALL', req, res, next);
});

router.get('/playlist/:id', (req, res, next) => {
  PlaylistService.handle('GET', req, res, next);
});

router.post('/playlist', (req, res, next) => {
  PlaylistService.handle('POST', req, res, next);
});

router.post('/playlistitem', (req, res, next) => {
  PlaylistItemService.handle('POST', req, res, next);
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
express.use('/api', router);

// START THE SERVER
// =============================================================================
express.listen(port);
console.log('Magic happens on port ' + port);
