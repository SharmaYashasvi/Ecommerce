const express = require("express");
const { getAllProducts , createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview} = require("../controllers/productController");
const { isAuthenticatedUser , authorizeRoles } = require("../middleware/auth");
const router = express.Router();
//get all product route
router.route("/products").get(getAllProducts);
// create product route
router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
//update & delete product route
router.route("/admin/product/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
// get product details
router.route("/product/:id").get(getProductDetails);
// review
 router.route("/review").put(isAuthenticatedUser,createProductReview);
module.exports = router;