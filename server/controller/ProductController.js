const multer = require('multer');
const { Product } = require('../models/Product');

//set A storage
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'uploads/');
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' || ext !== '.png') {
      return cb(res.status(400).end('only jpg, png are allowed'), false);
    }
    cb(null, true);
  },
});

let upload = multer({ storage: storage }).single('file');

const uploadProduct = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }

    return res.json({
      success: true,
      image: res.req.file.path,
      filename: res.req.file.filename,
    });
  });
};

//Add the Product To The Database
const addProduct = (req, res) => {
  //Add the Request
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, message: err });
    return res.status(200).json({ success: true });
  });
};

const getProduct = async (req, res) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let terms = req.body.searchTerm;

  //Here we work on Filter
  let findAgrs = {};
  // console.log(req.body.filters);

  //we Have to take key from Filters
  for (const key in req.body.filters) {
    // > "continents"
    // > "price"

    // let filters = {continents: [ 4,5], price: []};
    // let object = {};
    // for(let key in filters){
    // 	if(filters[key].length > 0){
    //     	object[key] =  filters[key];
    //     }
    // }
    // console.log(object);

    //output is Object { continents: Array [4, 5] }

    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        findAgrs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findAgrs[key] = req.body.filters[key];
      }
    }
  }

  //Term Condition
  if (terms) {
    setTimeout(async () => {
      await Product.find(findAgrs)
        .find({
          $or: [
            { title: { $regex: terms, $options: 'i' } },
            { description: { $regex: terms, $options: 'i' } },
          ],
        })
        .populate('writer')
        .sort([[sortBy, order]]) //['price', -1] Accending Deseing Order..
        .limit(limit)
        .skip(skip)
        .exec((err, products) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).json({
            success: true,
            products,
            postSize: products.length,
          });
        });
    }, 1500);
  } else {
    await Product.find(findAgrs)
      .populate('writer')
      .sort([[sortBy, order]]) //['price', -1] Accending Deseing Order..
      .limit(limit)
      .skip(skip)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });

        res.status(200).json({
          success: true,
          products,
          postSize: products.length,
        });
      });
  }
};

const getProductByID = (req, res) => {
  let ProductId = req.query.id;
  // console.log(id);
  const type = req.query.type;

  if (type === 'array') {
    let ids = req.query.id.split(','); //Split Convert into String
    ProductId = [];
    ProductId = ids.map((item) => {
      return item;
    });
  }

  Product.find({ _id: { $in: ProductId } }) //$in Return Match Value From the Array
    .populate('writer')
    .exec((err, product) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).send(product);
    });
};

// const deleteProductByCreator = (req, res) => {
//   Product.findByIdAndRemove({ _id: req.body.id }).exec((err, doc) => {
//     if (err) return res.status(400).json({ success: false, err });
//     res.status(200).json({
//       success: true,
//     });
//   });
// };

module.exports = {
  uploadProduct,
  addProduct,
  getProduct,
  getProductByID,
  // deleteProductByCreator,
};
