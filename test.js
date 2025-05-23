// // konfig path penyimpanan
// const uploadDir = path.resolve(__dirname, "../../../public/imageProfile");

// // konfigurasi multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     // const noPhone = req.body.phone.toString().replace(/[^a-zA-Z0-9]/g, "_");
//     // const noPhone = profileData.phone.toString();
//     // const randomDataProfile = nameCompany.replace(/[^a-zA-Z0-9]/g, "_");

//     // cb(null, randomDataProfile + path.extname(file.originalname));
//     // cb(null, noPhone + path.extname(file.originalname));
//     // coba
//     // const username = req.query.username || req.query.email;
//     // const randomDataProfile = username.replace(/[^a-zA-Z0-9]/g, "_");
//     // // cb(null, randomDataProfile + path.extname(file.originalname));
//     // cb(null, randomDataProfile + path.extname(file.originalname));
//     const username = req.query.username || req.headers["x-username"] || "default_user";
//     const safeName = username.replace(/[^a-zA-Z0-9]/g, "_");
//     const ext = path.extname(file.originalname);
//     cb(null, `${safeName}_${Date.now()}${ext}`);
//   },
// });

// // validasi type image
// const fileFilter = (req, file, cb) => {
//   const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
//   if (allowedMimeTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid image type"), false);
//   }
// };

// // konfigurasi multer untuk upload image
// const uploadUpdateUser = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
// });



// Untuk cleanResponse tidak ada response yang data nya null
// tidak di tampilkan
const cleanResponse = Object.fromEntries(
    Object.entries(response).filter(([_, v]) => v !== null)
    );
    res.status(201).json({
      status: "success",
      data: cleanResponse,
      data: response,
    });


const assignUsernameToRequest = async (req, res, next) => {
  try {
    const profile = await db.profiles.findFirst({
      where: {
        user_id: req.userId,
      },
      select: {
        username: true,
      },
    });

    if (!profile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    req.username = profile.username;
    next();
  } catch (error) {
    console.error("Error assigning username:", error);
    res.status(500).json({ message: "Server error" });
  }
};




// Get user apply
import { request, response } from "express";
import db from "../../connector";

async function getUserApply(req = request, res = response) {
  const userId = req.userId

  try {
    const response = await db.applications.findMany({
      where:{
        userId: userId
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
        job: true,
      }
    });
  
    if (!response) {
        return res.status(404).json({
          status: "error",
          message: `Transaction NOT Found with User ID ${userId} `,
        });
      }
  
    // Formatter Transaction
      const formatterUserApply = response.map((item) => {
        return {
          id: item.id,
          status: item.status,
          createdAt: item.createdAt,
          job_id: item.job.id,
          title: item.job.title,
          company_logo: item.job.company_logo,
          salary_min: item.job.salary_min,
          salary_max: item.job.salary_max,
          location: item.job.location,
        };
      }
      );
      res.status(200).json({
        status: "success",
        data: formatterUserApply,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}



// export { getUserApply };

