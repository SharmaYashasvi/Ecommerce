const express = require("express");
const { getAllProducts , createProduct, updateProduct, deleteProduct, getProductDetails} = require("../controllers/productController");
const router = express.Router();
//get all product route
router.route("/products").get(getAllProducts);
// create product route
router.route("/product/new").post(createProduct);
//update & delete product route
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);
module.exports = router;