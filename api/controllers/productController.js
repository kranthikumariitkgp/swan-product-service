const { currentDate } = require('../helpers/dateUtil');
const { storeProducts, reviewProducts, filterProduct, getLatestRecords } = require('../helpers/mongo');
const { errorMessage, errorStatusCode, successMessage, maxPageSize, reviewsSize } = require('../common/constant');
const { mapSearchProducts } = require('../mappers/commonMapper');

const createProduct = async (req, res) => {
        try{
                await storeProducts(req.body);
                res.send(successMessage);
              } catch(e) {
                res.statusCode = errorStatusCode;
                res.send(errorMessage);
              }
};

const reviewProduct = async (req, res) => {
        try{
        const reqBody = req.body;
        reqBody.createdAt = currentDate();
        await reviewProducts(reqBody);
        res.send(successMessage);
        } catch(e) {
                res.statusCode = errorStatusCode;
                res.send(errorMessage);
              }
};

const searchProduct = async (req, res) => {
        try{
        const page = Number(req.query.page);
        const queryProductSearch = { brand: req.body.searchText };
        const response = await filterProduct(queryProductSearch, page, maxPageSize);
        const { products, totalCount }= response;
        const barcodes = [];
        products.forEach(item => barcodes.push(item.barcode));
        const queryReviewSearch = { barcode: barcodes };
        const reviewComments = await getLatestRecords(queryReviewSearch, reviewsSize);
        const output = mapSearchProducts(products, totalCount, reviewComments);
        res.json(output);
        }  catch(e) {
                res.statusCode = errorStatusCode;
                res.send(errorMessage);
              }
};

module.exports = {
  createProduct,
  reviewProduct,
  searchProduct,
};
