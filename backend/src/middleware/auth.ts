import { loadEnvFile } from "node:process";


if (process.env.NODE_ENV !== "production") {
  loadEnvFile();
}
import type { NextFunction, Request, Response } from "express";
import { jwtVerify, SignJWT } from "jose";

const key = new TextEncoder().encode(process.env.JWT_SECRET);

const SECONDS = (10 * 60);

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

declare global {
  namespace Express {
    interface Request {
      user?: Object;
      session?: string;
    }
  }
}
export async function getSession(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];
    try {
      const payload = await decrypt(token);

      payload.expires = new Date(Date.now() + SECONDS * 1000);

      req.session = await encrypt(payload);
      req.user = payload;
      next();
    } catch (err) {
      return res.json({
        message: "Error in decrypting token",
        status: 400,
      });
    }
  } else {
    return res.status(403).json({
      message: "token not provided",
    });
  }
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(new Date(Date.now() + SECONDS * 1000))
    .sign(key);
}

export async function createSession(user: SafeUser) {
  const expires = new Date(Date.now() + SECONDS * 1000);
  const session = await encrypt({ userID: user.uid, ...user,expires });

  return session;
}

// export async function logout(req: Request, res: Response, next: NextFunction) {
//   console.log(req.session);
//   if (!req.session) return true;
//   const parsed = await decrypt(req.session);
//   parsed.expires = new Date(0);

//   req.session = await encrypt(parsed);
// return true
// }

// export async function updateSession(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   const session = req.session;
//   console.log(session);
//   if (!session) {
//     return res.json({
//       message: "session not initalized",
//     });
//   }

//   const parsed = await decrypt(session);
//   parsed.expires = new Date(Date.now() + SECONDS * 1000);

//   req.session = await encrypt(parsed);
//   next();
// }
