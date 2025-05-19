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
    const noPhone = req.body.phone.toString().replace(/[^a-zA-Z0-9]/g, "_");
    // const randomDataProfile = nameCompany.replace(/[^a-zA-Z0-9]/g, "_");

    // cb(null, randomDataProfile + path.extname(file.originalname));
    cb(null, noPhone + path.extname(file.originalname));
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
  const { full_name, bio, address, phone, age } = req.body;
  try {
    const userId = req.userId;

    // Validation
    if(!phone) {
      return res.status(400).json({
        status: "error",
        message: "Nomor Handphone harus di isi"
      })
    };

    const existingPhone = await db.profiles.findFirst({
      where: {
        phone: phone,
      }
    });
    if(existingPhone){
      return res.status(400).json({
        status: "error",
        message: "Nomor Handpone sudah terdaftar, coba nomor lain"
      })
    }
    // validation untuk user_id: userId, yg sudah di create ga bisa create lagi
    // TODO
    const existingUserID =  await db.profiles.findUnique({
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

    // // Rename file pakai phone
    // const oldPath = path.join(uploadDir, req.file.filename);
    // const newFileName = phone + path.extname(req.file.originalname);
    // const newPath = path.join(uploadDir, newFileName);

    // fs.renameSync(oldPath, newPath); // Rename file

    const response = await db.profiles.create({
      data: {
        full_name,
        bio,
        address,
        // image: newFileName,
        image: req.file.filename,
        phone,
        age,
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
