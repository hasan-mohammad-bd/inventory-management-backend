const express = require("express");
const router = express.Router();
const productControler = require("../controlers/product.controler");

router.route("/bulk-update")
    .patch(productControler.bulkUpdateByIdProduct);
router.route("/bulk-delete")
    .delete(productControler.bulkDeleteProduct)

router
  .route("/")
  .get(productControler.getProducts)
  .post(productControler.createProducts);

//all dynamic routes must be at the button so that client side can detect the other route quickly.
router
  .route("/:id")
  .patch(productControler.updateProduct)
  .delete(productControler.deleteProductById);
module.exports = router;
