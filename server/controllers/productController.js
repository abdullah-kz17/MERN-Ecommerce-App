const Product = require("../models/productModel")
const User = require("../models/userModel")

const createProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    subcategory,
    stock,
    brand,
  } = req.body;

  const userId = req.user?._id;

  try {
    if (!name || !description || !price || !category || !stock || !req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Missing required fields or images.' });
    }

    //     if (customFields && !Array.isArray(customFields)) {
    //   return res.status(400).json({ message: 'Custom fields must be an array.' });
    // }

    // if (customFields?.some(field => !field.label || !field.value)) {
    //   return res.status(400).json({ message: 'Custom fields must have both label and value.' });
    // }


    // Extract Cloudinary image URLs
    const imageUrls = req.files.map(file => file.path);

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      subcategory,
      stock,
      brand,
      images: imageUrls,
      user: userId,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: 'Product created successfully',
      product: savedProduct,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .populate('user', 'username email profilePic');

    res.status(200).json({
      message: 'Products fetched successfully',
      total: products.length,
      products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      message: 'Server error while fetching products',
    });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ _id: id }).populate('user', 'username email profilePic').populate('reviews.user', 'username profilePic')

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error while fetching product' });
  }
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const {
    name,
    description,
    price,
    category,
    subcategory,
    stock,
    brand,
  } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' });
  }
  try {
    let product = await Product.findOne({ _id: id, user: userId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    // Update only the fields that are provided in req.body
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price !== undefined ? price : product.price;
    product.category = category || product.category;
    product.subcategory = subcategory || product.subcategory;
    product.stock = stock !== undefined ? stock : product.stock;
    product.brand = brand || product.brand;

    const updatedProduct = await product.save();

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error while updating product' });
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const product = await Product.findOneAndDelete({ _id: id, user: userId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error while deleting product' });
  }
};

const searchProducts = async (req, res) => {
  try {
    const {
      keyword,
      category,
      subcategory,
      minPrice,
      maxPrice,
      sortBy,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    // Keyword search (name, description)
    if (keyword) {
      filter.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (subcategory) {
      filter.subcategory = subcategory;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Sorting
    let sortOption = {};
    if (sortBy === 'priceAsc') sortOption.price = 1;
    else if (sortBy === 'priceDesc') sortOption.price = -1;
    else if (sortBy === 'rating') sortOption.rating = -1;
    else sortOption.createdAt = -1; // default: newest first

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit))
      .populate('user', 'username email');

    res.status(200).json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    console.error('Error filtering products:', error);
    res.status(500).json({ message: 'Server error while filtering products' });
  }
};

const reviewProducts = async (req, res) => {
  const userId = req.user._id;
  const { comment, rating } = req.body;
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId).populate('reviews.user', 'username profilePic');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const alreadyReviewed = product.reviews.find(
      review => review.user?._id?.toString() === userId.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this product' });
    }

    const review = {
      user: userId,
      comment,
      rating,
    };

    product.reviews.push(review);

    product.rating =
      product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;

    await product.save();
    await product.populate('reviews.user', 'username profilePic');

    product.reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({ success: true, message: 'Review added successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const updateReview = async (req, res) => {
  const userId = req.user._id;
  const { productId, reviewId } = req.params;
  const { rating, comment } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = product.reviews.find(
      (rev) => rev._id.toString() === reviewId && rev.user.toString() === userId.toString()
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found or unauthorized" });
    }

    review.rating = rating !== undefined ? rating : review.rating;
    review.comment = comment !== undefined ? comment : review.comment;

    // Recalculate average rating
    product.rating =
      product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;

    await product.save();
    await product.populate("reviews.user", "username profilePic");

    res.status(200).json({ message: "Review updated successfully", product });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Server error while updating review" });
  }
};

const deleteReview = async (req, res) => {
  const userId = req.user._id;
  const { productId, reviewId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = product.reviews.find(
      (rev) => rev._id.toString() === reviewId && rev.user.toString() === userId.toString()
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found or unauthorized" });
    }

    // Remove the review
    product.reviews = product.reviews.filter((rev) => rev._id.toString() !== reviewId);

    // Recalculate rating
    if (product.reviews.length > 0) {
      product.rating =
        product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;
    } else {
      product.rating = 0;
    }

    await product.save();
    await product.populate("reviews.user", "username profilePic");

    res.status(200).json({ message: "Review deleted successfully", product });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Server error while deleting review" });
  }
};

const toggleFeaturedProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.isFeatured = !product.isFeatured;
    await product.save();

    res.status(200).json({
      message: `Product ${product.isFeatured ? 'featured' : 'unfeatured'} successfully`,
      product,
    });
  } catch (error) {
    console.error("Error toggling featured:", error);
    res.status(500).json({ message: "Server error while toggling featured" });
  }
};

const getFeaturedProducts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments({ isFeatured: true });

    const featuredProducts = await Product.find({ isFeatured: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('user', 'username email profilePic');

    res.status(200).json({
      message: 'Featured products fetched successfully',
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      featuredProducts,
    });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({ message: 'Server error while fetching featured products' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  searchProducts,
  reviewProducts,
  updateReview,
  deleteReview,
  getFeaturedProducts,
  toggleFeaturedProduct
};
