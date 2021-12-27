const jwt = require('jsonwebtoken');
const User = require('../model/User');

const requirAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //check json web token exists & is verified 
    if (token) {
        jwt.verify(token, 'abrar secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    }
    else {
        res.redirect('/login')
    }

}

//check current user 
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'abrar secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                res.redirect('/login');
                next()
            } else {
                console.log(decodedToken);
                let user = User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();

    }
}

module.exports = { requirAuth, checkUser }