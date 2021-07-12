{
  "recipes": [
      {
        "UseruserId": 1,
        "name": "Batatas com recheio",
        "image": null,
        "visible": 0,
        "steps": ""
      }
  ],
  "ingredients": [
      {
        "ID": NULL,
        "name": "Batatas",
        "type": ""
      },
      {
        "name": "Recheio",
        "type": ""
      }
  ]
  /* "steps": [
      {
        "stepNumber": 1,
        "description": "Ferver as batatas",
        "image": null
      },
      {
        "stepNumber": 2,
        "description": "Rechear",
        "image": null
      }
  ] */
  app.use('/uploads/images', express.static(path.join('uploads', 'images')))


  "multer": "1.4.2",
  "uuid": "3.3.3",


  router.route('/admin/product/new').post(fileUpload.single('image'), isAuthenticatedUser, authorize('admin'), createProduct)


const multer = require('multer');
const uuid = require('uuid/v1');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid() + '.' + ext);
    }
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error('Invalid mime type!');
    cb(error, isValid);
  }
});

module.exports = fileUpload;
}