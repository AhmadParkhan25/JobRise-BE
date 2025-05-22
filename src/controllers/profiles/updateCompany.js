import { request,response } from "express";
import db from "../../connector";
import multer from "multer";
import path from "path";
import fs from "fs";

// konfig path penyimpanan
const uploadDir = path.resolve(__dirname, "../../../public/imageProfile");

// konfigurasi multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const companyName = req.body.company_name;
    // const Username = req.companyName;
    const randomDataProduct = companyName.replace(/[^a-zA-Z0-9]/g, "_");

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
const uploadUpdateCompany = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

async function updateCompany(req = request, res = response) {
  try {
    const { company_name, address, website, industry, description } = req.body;
    const userId = req.userId;

    // Data Company
    const companyData = await db.company.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        id: true,
        company_name: true,
        address: true,
        website: true,
        industry: true,
        description: true,
        logo: true,
      },
    });
    if (!companyData) {
      return res.status(404).json({
        status: "error",
        message: "Company not found",
      });
    };

    // CASE 2
    let imageCompanyPath = companyData.logo;
    if (req.file) {
      const oldImagePath = path.resolve(uploadDir, companyData.logo);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      // upload foto baru
      imageCompanyPath = req.file.filename;
    }

    const response = await db.company.update({
      where: {
        id: companyData.id,
      },
      data: {
        company_name,
        address,
        logo: imageCompanyPath,
        website,
        industry,
        description,
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

export { updateCompany, uploadUpdateCompany };

