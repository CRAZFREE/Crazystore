const express = require("express");
const router = express.Router();

const {
    isSignedIn,
    isAuthenticated
} = require("../controllers/auth");

const {
    getUserById,
    getUser,
    updateUser,
    userPurchaseList
} = require("../controllers/user");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn,
    isAuthenticated,
    getUser
);
// router.get("/users", getAllUser);

router.put("/users/:userId", isSignedIn,
    isAuthenticated,
    updateUser
);

router.get("/order/user/userId:", isSignedIn,
    isAuthenticated,
    userPurchaseList
);

module.exports = router;