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
    // const Username = req.body.username;
    const Username = req.username;
    const randomDataProduct = Username.replace(/[^a-zA-Z0-9]/g, "_");

    cb(null, randomDataProduct + path.extname(file.originalname));
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
// konfigurasi multer untuk upload
const uploadUpdateUser = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

async function updateProfile(req = request, res = response) {
  try {
    const { full_name, bio, address, phone, age, linkedin, portofolio_url, city,} = req.body;
    const userId = req.userId;
    if (req.body.username || req.body.email) {
      return res.status(400).json({
        status: "error",
        message: "Tidak boleh mengubah username & Email.",
      });
    }

    //  Data Profile
    const profileData = await db.profiles.findUnique({
      where: {
        user_id: userId,
      },
      select:{
        id: true,
        email: true,
        user_id: true,
        image: true,
        username: true,
      }
    });
    if (!profileData) {
      return res.status(404).json({
        status: "error",
        message: `Profile with ID ${userId} not found / belum di buat`,
      });
    };

    const response = await db.profiles.update({
      where: {
        id: profileData.id,
      },
      data: {
        username: profileData.username,
        email: profileData.email,
        full_name,
        age,
        address,
        image: req.file.filename,
        phone,
        bio,
        linkedin,
        portofolio_url,
        city,
      },
    });

    res.status(200).json({
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

export { updateProfile, uploadUpdateUser };
