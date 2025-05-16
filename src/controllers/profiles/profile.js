import { request, response } from "express";
import db from "../../connector";
import multer from "multer";
import path from "path";
import fs from "fs";

// konfig path penyimpanan
const uploadDir = path.resolve(__dirname, "../../../public/img_ProfileUser");

// konfigurasi multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const phone = req.body.phone;
    const randomDataProfile = phone;

    cb(null, randomDataProfile + path.extname(file.originalname));
  },
});

// validasi type image
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid image type"), false);
  }
};

// konfigurasi multer untuk upload image
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

async function profileUser(req = request, res = response) {
  const { full_name, bio, adress, phone, age } = req.body;
  try {
    const userId = req.userId;

    // Validation
    if(!phone) {
      return res.status(400).json({
        status: "error",
        message: "Nomor Handphone harus di isi"
      })
    }
    // validation untuk user_id: userId, yg sudah di create ga bisa create lagi
    // TODO

    // Rename file pakai phone
    const oldPath = path.join(uploadDir, req.file.filename);
    const newFileName = phone + path.extname(req.file.originalname);
    const newPath = path.join(uploadDir, newFileName);

    fs.renameSync(oldPath, newPath); // Rename file

    const response = await db.profiles.create({
      data: {
        full_name,
        bio,
        adress,
        image: newFileName,
        phone,
        age,
        user_id: userId,
      },
    });
    res.status(201).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export { profileUser , upload};
