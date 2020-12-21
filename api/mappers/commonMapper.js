const mapSearchProducts = (products, totalCount, reviewComments) => {
  const product = [];
  products.forEach((element) => {
    const object = {};
    object.available = element.available;
    object.barcode = element.barcode;
    object.brand = element.brand;
    object.description = element.description;
    object.id = element.id;
    object.name = element.name;
    object.price = element.price;
    const reviews = reviewComments.filter(item => item.barcode === element.barcode);
    object.reviews = reviews;
    product.push(object);
  });
  return { totalCount, products: product };
};

module.exports = {
  mapSearchProducts,
};
