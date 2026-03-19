import { prisma } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = req.headers.get("authorization");
  console.log(session, "HEYEEY");
  if (!session) {
    return NextResponse.json({
      message: "Not Authorized",
      status: 500,
      success: false,
      convo: null,
    });
  }

  try {
    const convo = await prisma.conversation.findFirst({
      where: {
        cid: session,
      },
      include: {
        listing: true,
        messages: true,
        seller: true,
        buyer: true,
      },
    });

    return NextResponse.json({
      message: "Success getting Convo",
      success: true,
      convo,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Failed to Get Convo",
      status: 500,
      convo: null,
      success: false,
    });
  }
}
