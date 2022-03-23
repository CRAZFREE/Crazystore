//Naming should be done the same way as we have thrown out the user 
const User = require("../models/user");
const {
    check,
    validationResult
} = require("express-validator");

var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to save User in DB"
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            _id: user._id
        });
    });
};

exports.signin = (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body; //Destructing 

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User email dosen't found"
            });
        }

        if (!user.autheticate(password)) {
            return res.status(401).json({
                error: "Email and Password do not match"
            });
        }
        //Token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);

        //Put token in cookie
        res.cookie("token", token, { expire: new Date() + 9999 });

        //send response to frontend
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, name, email, role } });

    });
};

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User is Signed out successfully"
    });
};

//protected routes

//we are not writing next because expressjwt is a third party middleware
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});


//custom middleware
exports.isAuthenticated = (req, res, next) => {
    //checks the user
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role == 0) {
        return res.status(403).json({
            error: "You are not an ADMIN GET ADMIN PERMISSION"
        })
    }
    next();
};