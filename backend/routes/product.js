const express = require("express");
const { authenticationMid, roleChecked } = require("../middleware/auth.js");
const {
  allProducts,
  detailProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  createReview,
  adminProducts,
} = require("../controllers/product.js");

const router = express.Router();
router.get("/products", allProducts);
router.get(
  "/admin/products",
  authenticationMid,
  roleChecked("admin"),
  adminProducts
);
router.post(
  "/product/new",
  // authenticationMid,
  // roleChecked("admin"),
  createProduct
);
router.post("newReview", authenticationMid, createReview);
router.get("/products/:id", detailProduct);
router.delete(
  "/products/id",
  authenticationMid,
  roleChecked("admin"),
  deleteProduct
);
router.patch(
  "/products/:id",
  authenticationMid,
  roleChecked("admin"),
  updateProduct
);

module.exports = router;
