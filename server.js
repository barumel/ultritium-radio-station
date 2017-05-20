const Express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const RadioStream = require('ultritium-radio-stream');
const express = Express();
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const StreamService = require('./lib/service/stream/stream');
const PlaylistService = require('./lib/service/playlist/playlist');
const PlaylistItemService = require('./lib/service/playlistitem/playlistitem');
const mongoose   = require('mongoose');
const User = require('./lib/model/user');

mongoose.connect('mongodb://localhost:27017/radiostation');

express.use(cookieParser());
express.use(bodyParser.urlencoded({ extended: true }));
express.use(bodyParser.json());
express.use(passport.initialize());

passport.use(new BearerStrategy((token, next) => {

  console.log('ughblahh');
  return done(new Error());
}));

const port = process.env.PORT || 8080;

const router = Express.Router();

express.use(passport.authenticate('bearer', { session: false }));

router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' });
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
