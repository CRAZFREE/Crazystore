var express = require('express');
var router = express.Router();
const {
    signout,
    signup,
    signin,
    isSignedIn
} = require('../controllers/auth');

const {
    check,
    validationResult
} = require("express-validator");
//validationResult is not being used here so we have skiped it

//signup route
router.post("/signup", [check("name", "name should be atleast 3 characters")
        .isLength({ min: 3 }),
        check("email", "email is required").isEmail(),
        check("password", "password should be atleast 8 character").isLength({ min: 8 })
    ],
    signup
);

//Signin Route
router.post("/signin", [
        check("email", "email is required").isEmail(),
        check("password", "password is required").isLength({ min: 1 })
    ],
    signin
);

router.get('/signout', signout);

router.get('/test', isSignedIn, (req, res) => {
    res.json(req.auth);
});

module.exports = router;