const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        let mid = req.headers.referer.split("/");
        mid = mid[mid.length-1];
        cb(null, mid+'-'+file.fieldname + '-' + Date.now() + file.originalname)
    }
});
let upload = multer({storage: storage});

module.exports =  upload;