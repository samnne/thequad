import { type Request, type Response, Router } from "express";
import { createSession } from "../middleware/auth.ts";
import { prisma } from "../db/db.ts";
import { hashPassword, verifyPassword } from "../middleware/middleware.ts";

import { ErrorMessage, simplifyUserData } from "../utils/utils.ts";

const router = Router();



router.post("/register", async (req: Request, res: Response) => {
  const formData: UserFormData = req.body;

  try {
    const createdUser = await prisma.user.create({
      data: {
        email: formData.email,
        passwordHash: await hashPassword(formData.password),
        name: formData.name,
        profileURL: formData.profileURL,
      },
    });
    console.log(createdUser);
    
    const safeUser: SafeUser = simplifyUserData(createdUser) ;
    const session = await createSession(safeUser);

    console.log(safeUser);

    return res.json({ message: "Successfully Registered", safeUser });
  } catch (e) {
    console.log("An error occured Registering", e);
    return res.status(401).json(ErrorMessage("Failed to Register", 401));
  }
});

router.post("/login", async (req: Request, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return res.status(401).json(ErrorMessage("User does not exist", 404));
  }

  if (await verifyPassword(password, user.passwordHash)) {
    
    const safeUser: SafeUser = simplifyUserData(user)
    const session = await createSession(safeUser);
    req.session = session;

    return res.json({ session: req.session });
  } else {
    return res.status(401).json(ErrorMessage("Invalid Creds on Login", 500));
  }
});

export default router;
