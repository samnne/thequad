"use server";
import { prisma } from "./db";

export async function setVerifiedUser(
  uid: string | undefined,
  email?: string,
  name?: string,
) {
  if (!uid) return { user: null, success: false };

  const user = await prisma.user.upsert({
    where: { uid },
    update: { isVerified: true, email: email },
    create: {
      uid: uid,
      email: email ?? "",
      name: name ?? "",
      profileURL: "",
      isVerified: true,
    },
  });

  return user ? { user, success: true } : { user: null, success: false };
}
