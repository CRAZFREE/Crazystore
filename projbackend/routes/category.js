// const express = require("express");
// const router = express.Router();
// const {
//     getCategoryById,
//     createCategory,
//     getCategory,
//     updateCategory,
//     removeCategory,
//     getAllCategory
// } = require("../controllers/category");

// const {
//     isAdmin,
//     isAuthenticated,
//     isSignedIn
// } = require("../controllers/auth");

// const { getUserById } = require("../controllers/user");

// //Params
// router.param("userId", getUserById);
// router.param("categoryId", getCategoryById);

// //Create Routes
// router.post("/category/create/:userId",
//     isSignedIn,
//     isAuthenticated,
//     isAdmin,
//     createCategory);
// //order of middlewares are very important since next will be pointing to next middleware in the row


// //Read Routes
// router.get("/category/:categoryId", getCategory);
// router.get("/cate", getAllCategory);


// //Update Route
// router.put("/category/:categoryId/:userId",
//     isSignedIn,
//     isAuthenticated,
//     isAdmin,
//     updateCategory
// );

// //Delete Route
// router.delete("/category/:categoryId/:userId",
//     isSignedIn,
//     isAuthenticated,
//     isAdmin,
//     removeCategory
// );
// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  removeCategory
} = require("../controllers/category");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//actual routers goes here

//create
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

//read
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

//update
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

//delete

router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);

module.exports = router;
