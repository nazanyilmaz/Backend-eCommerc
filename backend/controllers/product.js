const cloudinary = require("cloudinary").v2;
const Product = require("../models/product.js");
const ProductFilter = require("../utils/productFilter.js");

const allProducts = async (req, res) => {
  try {
    // `req.query` ile sorgu parametrelerini alıyoruz
    const filter = new ProductFilter(req.query).filter();

    // Filtrelenmiş sorguyu kullanarak ürünleri bulma
    const products = await filter.query;

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Hata:", error); // Hatanın konsolda görünmesi için log ekledik
    res.status(500).json({ success: false, message: error.message });
  }
};
const adminProducts = async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    results: products.length,
    message: "All Products is founded",
    products,
  });
};
const detailProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({
    message: "a product is founded",
    product,
  });
};
//admin link
const createProduct = async (req, res, next) => {
  try {
    let images = [];

    // Eğer resim tek bir string olarak geldiyse, bunu diziye çeviriyoruz
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images; // Çoklu resim geldiğinde bu zaten bir dizi olacak
    }

    let allImage = [];

    // Cloudinary'e her resmi yükleyip, public_id ve url bilgilerini topluyoruz
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "products",
      });

      allImage.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    // Resim URL'lerini ve kullanıcı bilgisini req.body'ye ekliyoruz
    req.body.images = allImage;
    // req.body.user = req.user.id;

    // Ürünü veritabanına kaydediyoruz
    const product = await Product.create(req.body);

    // Başarılı sonuç veriyoruz
    res.status(201).json({
      message: "A product is created",
      product,
    });
  } catch (error) {
    // Hata durumunda yakalama ve hata cevabı verme
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Product creation failed",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.uploader.destroy(product.images[i].public_id);
  }
  await product.remove();

  res.status(200).json({
    message: "product is deleted",
  });
};
const updateProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.uploader.destroy(product.images[i].public_id);
    }
  }

  let allImage = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "products",
    });
    allImage.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = allImage;
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "product is updated",
  });
};

const createReview = async (req, res, next) => {
  const { productId, comment, rating } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  product.reviews.push(review);
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.rating = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    message: "Your review is added",
  });
};

module.exports = {
  allProducts,
  detailProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  createReview,
  adminProducts,
};
