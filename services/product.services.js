const Product = require("../models/Product");

exports.getProductService = async (filters, queries) => {

  const products = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .sort(queries.sortBy)
    .select(queries.fields);
    const totalProducts = await Product.countDocuments(filters)
    const pageCount = Math.ceil(totalProducts/queries.limit)
  return {totalProducts, products, pageCount};
};

exports.createProductService = async (data) => {
  const product = await Product.create(data);
  return product;
};

exports.updateProductService = async (id, body) => {
  const result = await Product.updateOne(
    { _id: id },
    { $set: body },
    { runValidators: true }
  );
  return result;
};

exports.bulkUpdateProductByIdService = async (data) => {
  //update many things with same data
  /*   const result = await Product.updateMany({ _id: data.ids }, data.data, {
    runValidators: true,
  }); */

  //update many things with different data
  const products = [];
  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });
  const result = await Promise.all(products);
  return result;
};

exports.deleteProductByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

exports.bulkDeleteProductByIdService = async (data) => {
  //update many things with same data
  const result = await Product.deleteMany({ _id: data });
  return result;
};
