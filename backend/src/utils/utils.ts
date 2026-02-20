import { type User } from "../generated/prisma/client.ts";

export function simplifyUserData(user: User): SafeUser {
  return {
    uid: user.uid,
    email: user.email,
    name: user.name,
    profileURL: user.profileURL,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
  };
}


export function ErrorMessage(message:string, status: string, ...args: Array<string | number | null>): Object{
    return {
        message, 
        status,
        ...args
    }
}