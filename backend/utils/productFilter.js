const product = require("../models/product");

product;

class ProductFilter {
  constructor(queryObj) {
    this.queryObj = queryObj;
    this.query = product.find();
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryObj };
    const deleteArea = ["keyword", "page", "limit"];
    deleteArea.forEach((item) => delete queryCopy[item]);
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    const formattedQuery = JSON.parse(queryStr);
    this.query = this.query.find(formattedQuery);

    return this;
  }
  pagination(resultPerPage) {
    const activePage = this.queryStr.page || 1;
    const skip = resultPerPage * (activePage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ProductFilter;
