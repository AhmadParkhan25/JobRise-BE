import db from "../connector";

export async function getProfileIdByUserId(userId) {
  const profile = await db.profiles.findUnique({
    where: { user_id: userId },
    select: { id: true },
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  return profile.id;
}
