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
    const nameCompany = req.body.company_name || req.body.userId;
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
const uploadCompany = multer({
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

    const findEmail = await db.users.findFirst({
      where: {
        id: userId,
      },
      select: {
        email: true,
        email_verified: true,
      }
    });

    const existingCompanyName = await db.company.findFirst({
      where: {
        company_name: company_name,
      }
    });
    if (existingCompanyName){
      return res.status(400).json({
        status: "error",
        message: "Company Name Sudah ada, coba ganti nama lain"
      })
    }
    const existingUserID =  await db.company.findUnique({
      where: {
        user_id: userId
      }
    });
    if(existingUserID){
      return res.status(400).json({
        status: "error",
        message: "Profile user ini sudah di buat, tolong update aja"
      })
    }

    const response = await db.company.create({
      data: {
        company_name,
        email: findEmail.email,
        email_verified: findEmail.email_verified,
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


export { profileCompany, uploadCompany }