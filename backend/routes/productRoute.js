const express = require("express");
const { getAllProducts , createProduct, updateProduct, deleteProduct, getProductDetails} = require("../controllers/productController");
const { isAuthenticatedUser , authorizeRoles } = require("../middleware/auth");
const router = express.Router();
//get all product route
router.route("/products").get(getAllProducts);
// create product route
router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
//update & delete product route
router.route("/product/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
.get(getProductDetails);
module.exports = router;