const {
  getStockService,
  createStockService,
  updateStockService,
  bulkUpdateStockByIdService,
  deleteStockByIdService,
  bulkDeleteStockByIdService,
  getStockByIdService,
} = require("../services/stock.services");

exports.getStocks = async (req, res, next) => {
  try {
    let filters = { ...req.query };

    //sort, page, limit --> exclude
    const excludeFields = ["sort", "page", "limit", "fields"];
    excludeFields.forEach((field) => delete filters[field]);

    //gt, lt, gte, lte
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filtersString);
    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }
    //pagination
    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const stocks = await getStockService(filters, queries);
    res.status(200).json({
      status: "success",
      data: stocks,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "can't get data",
      error: error.message,
    });
  }
};

exports.createStock = async (req, res, next) => {
  try {
    // const product = new Product(req.body)
    // const result = await product.save()
    const result = await createStockService(req.body);
    // result.logger();
    res.status(200).json({
      status: "Success",
      message: "data has been inserted",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "data is not inserted",
      error: error.message,
    });
  }
};

exports.updateStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateStockService(id, req.body);
    res.status(200).json({
      status: "Success",
      message: "data has been updated",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "couldn't update the product",
      error: error.message,
    });
  }
};

exports.bulkUpdateByIdStack = async (req, res, next) => {
  try {
    const result = await bulkUpdateStockByIdService(req.body);
    res.status(200).json({
      status: "Success",
      message: "data has been updated",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "couldn't update the Stock",
      error: error.message,
    });
  }
};

exports.deleteStockById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteStockByIdService(id);
    res.status(200).json({
      status: "Success",
      message: "Product has been deleted",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to Delete the product",
      error: error.message,
    });
  }
};

exports.bulkDeleteStock = async (req, res, next) => {
  try {
    const result = await bulkDeleteStockByIdService(req.body.ids);
    if (!result.deletedCount) {
      res.status(400).json({
        status: "failed",
        message: "couldn't find the product",
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Products have been deleted",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to Delete the products",
      error: error.message,
    });
  }
};

exports.getStockById = async (req, res, next)=>{
  try {
    const { id } = req.params;
    const stock = await getStockByIdService(id);
    if(!stock){
      res.status(400).json({
        status: "failed",
        message: "Failed to get the stock with this ID",
        error: error.message,
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Successfully got the stock",
      data: stock,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to get the stock",
      error: error.message,
    });
  }
}
