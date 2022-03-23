const express = require("express");
const {
    isSignedIn,
    isAuthenticated,
    isAdmin
} = require("../controllers/auth");
const {
    getProductById,
    createProduct,
    photo,
    getProduct,
    deleteProduct,
    updateProduct,
    getProducts,
    getAllUniqueCategories
} = require("../controllers/product");
const {
    getUserById,
    getUser
} = require("../controllers/user");

const router = express.Router();

router.param("userId", getUserById);
router.param("productId", getProductById)

//createRoutes
router.post("/product/create/:userId",
        isSignedIn,
        isAuthenticated,
        isAdmin,
        createProduct
    )
    // router.get("/product/:productId", isSignedIn, isAuthenticated, getProductById)

//readRoute
router.get("/product/:productId", getProduct)
router.get("/product/photo/:productId", photo)

//deleteRoute
router.delete("/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteProduct
)


//updateRoute
router.put("/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateProduct)


//listingRoute
router.get("/products", getProducts)

router.get("/product/categories", getAllUniqueCategories)
module.exports = router;