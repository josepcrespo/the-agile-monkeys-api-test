// Initializes the `customers` service on path `/customers`
const { Customers }    = require('./customers.class');
const { authenticate } = require('@feathersjs/authentication').hooks;

const createService = require('feathers-sequelize');
const createModel   = require('../../models/customers.model');
const hooks         = require('./customers.hooks');
const multer        = require('multer');

function fileFilter(req, file, cb) {
  if (!file.mimetype) {
    cb(new Error('I don\'t have a clue for the file mimetype!'));
  } else if (
        file.mimetype.split('/')[0] === 'image' &&
        file.mimetype.includes('gif') ||
        file.mimetype.includes('jpeg') ||
        file.mimetype.includes('png') ||
        file.mimetype.includes('svg+xml') ||
        file.mimetype.includes('webp')
    ) {
    // Accepting the file
    cb(null, true);
  } else {
    // Rejecting the file
    cb(new Error('The photo file needs to be an image!'));
  }
}

let multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/customers');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = file.originalname.split('.').pop();
    cb(null, uniqueSuffix + '.' + fileExtension);
  }
});

const multerUpload = multer({
  fileFilter: fileFilter,
  storage: multerStorage,
  limits: {
    fieldSize: 1e+8, // Max field value size in bytes, here it's 100MB
    fileSize: 1e+7, //  The max file size in bytes, here it's 10MB
    files: 1
    // READ MORE https://www.npmjs.com/package/multer#limits
  }
});

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  };

  // Initialize our service with any options it requires
  app.use(
    '/customers',
    multerUpload.single('photo'),
    (req, _res, next) => {
      const { method } = req;
      if (method === 'POST' || method === 'PATCH') {
        console.log('BEFORE req');
        console.log(req.body);
        console.log('AFTER req');
        // If you want to filter the file based on the extension,
        // you can register a fileFilter using multer. And, to make it work,
        // transfer the received files to feathers.
        req.feathers.file = req.file;

        // Transforming the request to the model shape
        const body = [{
          name: req.body.name,
          surname: req.body.surname,
          photo: req.file ? req.file.filename : null
        }];
        // TODO: test the PATCH method.
        req.body = (method === 'POST') ? body : body[0];
      }
      next();
    },
    createService(options)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service('customers');

  service.hooks(hooks);
};
