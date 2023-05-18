const Stock = require("../models/Stock");

exports.getStockService = async (filters, queries) => {
  const stocks = await Stock.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .sort(queries.sortBy)
    .select(queries.fields);
  const totalStocks = await Stock.countDocuments(filters);
  const pageCount = Math.ceil(totalStocks / queries.limit);
  return { totalStocks: totalStocks, stocks, pageCount };
};

exports.createStockService = async (data) => {
  const stock = await Stock.create(data);
/*   const { _id: productId, brand } = stock;
  //update brand
  const res = await Brand.updateOne(
    { _id: brand.id },
    { $push: { stocks: productId } }
  ); */

  return stock;
};

exports.updateProductService = async (id, body) => {
  const result = await Stock.updateOne(
    { _id: id },
    { $set: body },
    { runValidators: true }
  );
  return result;
};

exports.bulkUpdateProductByIdService = async (data) => {
  //update many things with same data
  /*   const result = await Stock.updateMany({ _id: data.ids }, data.data, {
    runValidators: true,
  }); */

  //update many things with different data
  const stocks = [];
  data.ids.forEach((stock) => {
    stocks.push(Stock.updateOne({ _id: stock.id }, stock.data));
  });
  const result = await Promise.all(stocks);
  return result;
};

exports.deleteProductByIdService = async (id) => {
  const result = await Stock.deleteOne({ _id: id });
  return result;
};

exports.bulkDeleteProductByIdService = async (data) => {
  //update many things with same data
  const result = await Stock.deleteMany({ _id: data });
  return result;
};
