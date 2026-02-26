import { simplifyUserData, verifyPassword } from "@/app/server-utils/utils";
import { prisma } from "@/db/db";
import { createSession, getSession, login } from "@/lib/lib";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body?.email,
    },
  });
  if (!user) {
    return NextResponse.json({
      message: "User does not exist",
      status: 404,
    });
  }

  if (await verifyPassword(body.password, user.passwordHash)) {
    const safeUser: SafeUser = simplifyUserData(user);
    const session = await createSession(safeUser);

    return NextResponse.json({ ...safeUser, session });
  } else {
    return NextResponse.json({
      message: "User does not exist",
      status: 404,
    });
  }
}
