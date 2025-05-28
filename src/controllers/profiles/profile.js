import { request, response } from "express";
import db from "../../connector";
import multer from "multer";
import path from "path";

// konfig path penyimpanan
const uploadDir = path.resolve(__dirname, "../../../public/imageProfile");

// konfigurasi multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const username = req.body.username || req.body.email;
    const randomDataProfile = username.replace(/[^a-zA-Z0-9]/g, "_");

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
const uploadUser = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

async function profileUser(req = request, res = response) {
  const { username, full_name, age, address, city, phone, bio, linkedin, portofolio_url } = req.body;
  try {
    const userId = req.userId;

    // Validation
    if(!username) {
      return res.status(400).json({
        status: "error",
        message: "Username harus di isi"
      })
    };

    const findEmail = await db.users.findFirst({
      where: {
        id: userId,
      },
      select: {
        email: true,
        email_verified: true,
      }
    });

    const existingUsername = await db.profiles.findFirst({
      where: {
        username: username,
      }
    });
    if(existingUsername){
      return res.status(400).json({
        status: "error",
        message: "Username sudah terdaftar, coba username lain"
      })
    }

    const response = await db.profiles.create({
      data: {
        username,
        email: findEmail.email,
        full_name,
        age,
        address,
        city,
        image: req.file.filename,
        phone,
        bio,
        linkedin,
        portofolio_url,
        user_id: userId,
      },
    });
    const cleanResponse = Object.fromEntries(
    Object.entries(response).filter(([_, v]) => v !== null)
    );
    res.status(201).json({
      status: "success",
      data: cleanResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export { profileUser , uploadUser};
