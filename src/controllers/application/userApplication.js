// import { request, response } from "express";
// import db from "../../connector";
// import { Status } from "@prisma/client";



// async function userApplication(req = request, res = response) {
//   const userId = req.userId;
//   const jobId = parseInt(req.params.id);

//   try {

//     const response = await db.applications.create({
//       data: {
//         userId: userId,
//         jobId: jobId,
//         profileId: findNameCompany.id,
//         status: Status.Screening
//       }
//     })

//     res.status(200).json({
//       status: "success",
//       // data:{
//       //     applicationData
//       // }
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// }


// export { userApplication };