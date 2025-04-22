import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export function saltAndHashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export async function getUserFromDB(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials.");
  }

  return user;
}

export async function createUser(email: string, password: string) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("This email already exists");
  }

  return await prisma.user.create({
    data: {
      email,
      password: saltAndHashPassword(password),
    },
  });
}
