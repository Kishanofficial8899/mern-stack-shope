const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaOption = require('./SchemaOptions');

const PaymentSchema = new Schema(
  {
    user: {
      type: Array,
      default: [],
    },
    data: {
      type: Array,
      default: [],
    },
    product: {
      type: Array,
      default: [],
    },
  },

  { SchemaOption }
);

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = { Payment };
