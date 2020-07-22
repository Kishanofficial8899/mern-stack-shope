const router = require('express').Router();
// const { User } = require('../models/User');

const {
  AuthController,
  ProductController,
  PaymentController,
  HistoryPage,
} = require('../controller');
const { auth } = require('../middleware/auth');

//User
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/logout', auth, AuthController.logout);
router.get('/auth', auth, AuthController.auth);
router.get('/addToCartUser', auth, AuthController.addToCartUser);
router.get('/removeItemFromCart', auth, AuthController.removeItemFromTheCart);

//Product
router.post('/uploadProduct', auth, ProductController.uploadProduct);
router.post('/addProduct', auth, ProductController.addProduct);
router.post('/getProduct', ProductController.getProduct);
router.get('/getProductById', ProductController.getProductByID);

//Payemt Controller
router.post('/successBuy', auth, PaymentController.PaymentController);

//History Page
router.get('/getHistory', auth, HistoryPage.gethistory);

module.exports = router;
