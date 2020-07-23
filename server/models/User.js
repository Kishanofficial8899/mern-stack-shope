const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Gen Salt
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require('moment');
const SchemaOptions = require('./SchemaOptions');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
      maxlength: 50,
    },
    email: {
      type: mongoose.Schema.Types.String,
      trim: true,
      unique: 1,
    },
    password: {
      type: mongoose.Schema.Types.String,
      minglength: 5,
    },
    lastname: {
      type: mongoose.Schema.Types.String,
      maxlength: 50,
    },
    role: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    cart: {
      type: Array,
      default: [],
    },
    history: {
      type: Array,
      default: [],
    },
    image: {
      type: mongoose.Schema.Types.String,
    },
    token: {
      type: mongoose.Schema.Types.String,
    },
    tokenExp: {
      type: mongoose.Schema.Types.Number,
    },
  },
  SchemaOptions
);

/* BEFORE SAVE I HAVE TO HASE THE PASSWORD  */

userSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), process.env.secret);

  var oneHour = moment().add(1, 'hour').valueOf();

  user.tokenExp = oneHour;
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  jwt.verify(token, process.env.secret, function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};
const User = mongoose.model('User', userSchema);

module.exports = { User };
