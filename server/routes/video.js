const express = require('express');
const router = express.Router();
//const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");

const storage = multer.diskStorage({
    //파일이 저장되는 위치
    destination : (req, file, cb) =>{
        cb(null, "./server/uploads/");
    },
    //파일 명
    filename : (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter : (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if(ext !== '.mp4' || ext !== '.mkv'){
            return cb(res.status(400).end('only mp4 is allowed'), false);
        }
        cb(null, true);
    }
});

const upload = multer({storage: storage}).single("file");

//=================================
//             Video
//=================================
router.post('/uploadfiles', (req, res) => {
    //save to server
    upload(req, res, err => {
        console.log(err);
        if(err) return res.json({success:false, err});
        return res.json({success : true, url: res.req.file.path, fileName: res.req.file.filename});
    });
});

module.exports = router;
