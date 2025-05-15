const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create the Product Schema
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price must be greater than or equal to 0'],
    },
    images: [
      {
        type: String, 
        required: true,
      },
    ],
    category: {
  type: String,
  required: true,
  enum: [
    'cricket',
    'football',
    'hockey',
    'table-tennis',
    'badminton',
  ],
},
subcategory: {
  type: String,
  enum: [
    'bats',
    'balls',
    'shoes',
    'rackets',
    'jerseys',
    'kits',
    'gloves',
    'nets',
    'goalkeeper-gloves',
    'protective-gear',
      ],
    },
    stock: {
      type: Number,
      required: true,
      min: [0, 'Stock must be greater than or equal to 0'],
    },
    brand: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    rating: {
      type: Number,
      min: [0, 'Rating must be between 0 and 5'],
      max: [5, 'Rating must be between 0 and 5'],
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
        comment: String,
        rating: {
          type: Number,
          min: [0, 'Rating must be between 0 and 5'],
          max: [5, 'Rating must be between 0 and 5'],
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    isFeatured: { type: Boolean, default: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
