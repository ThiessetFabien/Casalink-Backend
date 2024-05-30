import express from 'express';
const router = express.Router();
import multer from 'multer';


let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './app/uploads/avatars');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

let upload = multer({ storage: storage });

// Route POST 
// router.post('/upload', (req, res) => {
//   try {
//     const filePath = req.file.path; // save the path of the uploaded file
//     res.status(200).json({ filePath });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Erreur lors de l\'upload de l\'image' });
//   }
// });

export default upload;