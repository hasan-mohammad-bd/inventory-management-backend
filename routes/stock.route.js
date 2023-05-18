const express = require("express");
const router = express.Router();
const stockController = require("../controlers/stock.controller");
const multer = require("multer");
const uploader = require("../middleware/uploader")


/* router.route("/bulk-update")
    .patch(stockController.bulkUpdateStock);
router.route("/bulk-delete")
    .delete(stockController.bulkDeleteStock) */

router
  .route("/")
  .get(stockController.getStocks)
  .post(stockController.createStock);

//all dynamic routes must be at the button so that client side can detect the other route quickly.
router
  .route("/:id")
  .get(stockController.getStockById)
  .patch(stockController.updateStock)
  .delete(stockController.deleteStockById);

module.exports = router;
