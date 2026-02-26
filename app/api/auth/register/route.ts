import { hashPassword, simplifyUserData } from "@/app/server-utils/utils";
import { prisma } from "@/db/db";
import { createSession } from "@/lib/lib";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {email, password, name, profileURL}: UserFormData = await req.json();

  try {

    const createdUser = await prisma.user.create({
      data: {
        email: email,
        passwordHash: await hashPassword(password),
        name:name,
        profileURL:profileURL,
      },
    });
    console.log(createdUser);

    const safeUser: SafeUser = simplifyUserData(createdUser);
    const session = await createSession(safeUser);
    (await cookies()).set("session", session, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });
    

    return NextResponse.json({
      message: "Successfully Registered",
      safeUser,
 
    });
  } catch (e) {
    console.log("An error occured Registering", e);
    return NextResponse.error();
  }
}
