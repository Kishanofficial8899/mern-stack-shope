const { User } = require('../models/User');
const { Product } = require('../models/Product');

const auth = async (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history,
  });
};

const register = async (req, res) => {
  const { email, password } = req.body;
  const message = [];
  if (!email) {
    message.push('email is required');
  }
  if (!password) {
    message.push('Password is required');
  }
  if (!email || !password) {
    res.status(404);
    res.json({
      code: 401,
      data: {
        message,
      },
      success: false,
    });
    return;
  }
  let user = await User.findOne({ email });
  if (user) {
    res.status(401);
    res.json({
      code: 401,
      message: 'User is already exists',
      success: false,
    });
    return;
  }

  user = new User({
    name: req.body.name,
    email,
    password,
    image: req.body.image,
  });

  //Saving User
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      data: {
        _id: doc._id,
        email: doc.email,
      },
    });
  });
};

const login = async (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: 'Auth failed, email not found',
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: 'Wrong password' });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        res.cookie('w_authExp', user.tokenExp);
        res.cookie('w_auth', user.token);
        res.status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
};

//for the logout
const logout = async (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user.id },
    { token: '', tokenExp: '' },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
};

//Add To Cart
const addToCartUser = async (req, res) => {
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    let duplicate = false;

    userInfo.cart.forEach((cartid) => {
      if (cartid.id == req.query.productId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.user._id, 'cart.id': req.query.productId },
        { $inc: { 'cart.$.quantity': 1 } },
        { new: true },

        (err, userInfo) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(userInfo.cart);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: req.query.productId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(userInfo.cart);
        }
      );
    }
  });
};

//remove Item from Cart

const removeItemFromTheCart = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: { cart: { id: req.query._id } },
    },
    { new: true },
    (err, userInfo) => {
      let cart = userInfo.cart;
      let array = cart.map((item) => {
        return item.id;
      });

      Product.find({ _id: { $in: array } })
        .populate('writer')
        .exec((err, cartDetail) => {
          return res.status(200).json({
            cartDetail,
            cart,
          });
        });
    }
  );
};

module.exports = {
  register,
  login,
  logout,
  auth,
  addToCartUser,
  removeItemFromTheCart,
};
