var allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
  '.json'
];

//Require modules
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const mongoose = require('mongoose');

//Process environment variables
dotenv.config();

//General middlewares
app.use(express.json());

//Import routes
const authRoute = require('./routes/auth');
const contactRoute = require('./routes/contact');
const checkoutRoute = require('./routes/checkout');

//Route middlewares
app.use('/api/user', authRoute);
app.use('/api/contacts', contactRoute);
app.use('/api/checkout', checkoutRoute);

//Load up Angular
app.use(express.static(path.join(__dirname, 'dist')));

//Turn on server
var server = app.listen(process.env.PORT || 4200, () => console.log("App now running on port " + server.address().port));

//#region Helper Methods

function signToken(payload) {
  var privateKey = fs.readFileSync('./private.key', 'utf8');

  var signOptions = {
    expiresIn: "12h",
    algorithm: "RS256"
  };

  var token = jwt.sign(payload, privateKey, signOptions);
  console.log("Token Generated: " + token);
  return token;
}

function decodeToken(token) {
  var publicKey = fs.readFileSync('./public.key', 'utf8');
  return jwt.verify(token, publicKey, function (err, decoded) {
    if (err) throw new Error(err) // Manage different errors here (Expired, untrusted...)
    return decoded; // If no error, token info is returned in 'decoded'
  });
}

//#endregion

//#region Angular Routing Catch All

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
    res.sendFile(path.resolve(`${req.url}`));
  } else {
    res.sendFile(path.resolve('dist/index.html'));
  }
});

//#endregion
