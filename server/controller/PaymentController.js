const { User } = require('../models/User');
const { Payment } = require('../models/Payment');
const async = require('async');
const { Product } = require('../models/Product');
var moment = require('moment');

const PaymentController = (req, res) => {
  let history = [];
  let transactionData = {};

  //1.Put Brif Payment Information inside our User

  /*WE Pass CartDetail from Cart.js File */
  req.body.cartDetail.forEach((item) => {
    history.push({
      dateOfPurchase: moment().format('MMMM Do YYYY, h:mm:ss a'),
      name: item.title,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID,
    });
  });

  //2.Put All The Payment Details form Payment Collection
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  transactionData.data = req.body.paymentData;
  transactionData.product = history; //Whole Array of History

  User.findByIdAndUpdate(
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });

      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });

        //3. Increse The Amount of Number for the Sold Information
        //first We need to know how many product were sold in this transaction for
        // each of products
        let Products = [];
        doc.product.forEach((item) => {
          Products.push({ id: item.id, quantity: item.quantity });
        });
        // first Item    quantity 2
        // second Item  quantity 3

        async.eachSeries(
          Products,
          (item, callback) => {
            Product.update(
              { _id: item.id },
              { $inc: { sold: item.quantity } },
              { new: false },
              callback
            );
          },
          (err) => {
            if (err) return res.json({ success: false, err });
            res.status(200).json({
              success: true,
              cart: user.cart, //On Upper I Will Emptry The Cart
              cartDetail: [],
            });
          }
        );
      });
    }
  );
};

module.exports = {
  PaymentController,
};
