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
