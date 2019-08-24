const passport = require('passport');

module.exports = app => {
    // Google
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email'],
        }),
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        },
    );

    // Github
    /* app.get(
        '/auth/github',
        passport.authenticate('github', { scope: ['user:email'] }),
    );

    app.get('/auth/github/callback', passport.authenticate('github'));

    // Linkedin
    app.get('/auth/linkedin', passport.authenticate('linkedin'));

    app.get('/auth/linkedin/callback', passport.authenticate('linkedin'));*/

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        //res.send(req.session);
        res.send(req.user);
    });
};
