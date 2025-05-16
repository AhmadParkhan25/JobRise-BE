import { request, response } from "express";
import db from "../../connector";
import multer from "multer";
import path from "path";

// konfig path penyimpanan
const uploadDir = path.resolve(__dirname, "../../../public/img_ProfileCompany");

// konfigurasi multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const nameCompany = req.body.company_name;
    const randomDataProfile = nameCompany.replace(/[^a-zA-Z0-9]/g, "_");

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

async function profileCompany(req = request, res = response) {
  const { company_name, address, website, industry, description } = req.body;
  try {
    const userId = req.userId;

    // validation
    if(!company_name) {
      return res.status(400).json({
        status: "error",
        message: "Company Name Harus di isi"
      })
    };

    const response = await db.company.create({
      data: {
        company_name,
        address,
        logo: req.file.filename,
        website,
        industry,
        description,
        user_id: userId,
      }
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


export { profileCompany, upload }