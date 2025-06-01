// import { request, response } from "express";
// import db from "../../connector";
// import axios from "axios";

// async function jobList(req = request, res = response) {
//   const { skills } = req.body;

//   try {
//     const userId = req.userId;
//     const profileID = await getProfileIdByUserId(userId);

//     const findSkills = await db.skills.findMany({
//       where: {
//         profileId: profileID,
//       },
//       select: {
//         name: true,
//       },
//     });


//     // Gabungkan skill jadi string
//     // const formattedSkills = findSkills.map(skill => skill.name).join(", ");

//     // Encode skill agar aman di URL
//     // const encodedSkills = encodeURIComponent(formattedSkills);

//     // Kirim request GET ke ML endpoint
//     // const mlResponse = await axios.get(
//     //   `https://machine-learning-production.up.railway.app/recomend?title=${encodedSkills}`
//     // );


//     const mlResponse = await axios.post(
//       "https://machine-learning-production.up.railway.app/predict",
//       { skills }
//     );

//     // Ambil data response dari hasil ML
//     const aiResponse = mlResponse

//     res.status(200).json({
//       status: "success",
//       message: findSkills.skills,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// }

// export { jobList }