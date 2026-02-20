import bcrypt from "bcrypt";
export const logRequests = (req: any, res: any, next: any) => {
  console.log(`${req.method} Request to ${req.url} at ${new Date(Date.now())}`);
  next();
};

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 8;
  return await bcrypt.hashSync(password, saltRounds);
}
export async function verifyPassword(password: string, hash: string) {

  return await bcrypt.compareSync(password, hash);
}
