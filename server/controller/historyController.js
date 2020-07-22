const { User } = require('../models/User');

const gethistory = async (req, res) => {
  User.findOne({ _id: req.user._id }, (err, doc) => {
    let history = doc.history;
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, history });
  });
};

module.exports = {
  gethistory,
};
