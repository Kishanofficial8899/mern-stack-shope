const mongoose = require('mongoose');
const SchemaOptions = require('./SchemaOptions');

const ProductSchema = new mongoose.Schema(
  {
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: mongoose.Schema.Types.String,
      maxlength: 50,
    },
    description: {
      type: mongoose.Schema.Types.String,
    },
    price: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    images: {
      type: Array,
      default: [],
    },
    continents: {
      type: mongoose.Schema.Types.Number,
      default: 1,
    },
    sold: {
      type: mongoose.Schema.Types.Number,
      maxlength: 100,
      default: 0,
    },
    views: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
  },
  { SchemaOptions }
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = { Product };
