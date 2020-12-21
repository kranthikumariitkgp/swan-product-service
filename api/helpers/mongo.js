const mongoose = require('mongoose');

// define Schema
const ProductsSchema = mongoose.Schema({
  name: String,
  barcode: Number,
  price: Number,
  brand: String,
  description: String,
  quantity: Number,
  available: Boolean,
});

const ReviewSchema = mongoose.Schema({
  barcode: Number,
  createdAt: String,
  review: String,
  name: String,
});

// compile schema to model
const Products = mongoose.model('product', ProductsSchema, 'product');
const Reviews = mongoose.model('review', ReviewSchema, 'review');

const storeProducts = async (obj) => {
  const products = new Products(obj);
  return products.save();
};

const reviewProducts = async (obj) => {
  const reviews = new Reviews(obj);
  return reviews.save();
};

const filterProduct = async (query, pageNumber, pageSize) => {
  const skips = pageSize * (pageNumber - 1);
  const products = await Products.find(query).skip(skips).limit(pageSize);
  const totalCount = await Products.find(query).count();
  return { totalCount, products };
};

const getLatestRecords = (query, reviewSize) => Reviews.find(query).sort({ createdAt: -1 }).limit(reviewSize);

module.exports = {
  storeProducts,
  reviewProducts,
  filterProduct,
  getLatestRecords,
};
