const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const https = require('https');
const fs = require('fs');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

const privateKey = fs.readFileSync('./https/key.pem', 'utf8');
const certificate = fs.readFileSync('./https/cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    }),
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

if (process.env.NODE_ENV === 'development') {
    const httpServer = http.createServer(app);
    const httpsServer = https.createServer(credentials, app);
    httpServer.listen(5000);
    httpsServer.listen(5001);
} else {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT);
}
