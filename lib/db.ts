import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export function saltAndHashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export async function getUserFromDB(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error(
        "Invalid login details. Please check your email address and password."
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials.");
    }

    return user;
  } catch (error) {
    console.error("DB error:", error);
    throw error;
  }
}

export async function createUser(email: string, password: string) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error(
      "This email address already exists. Log in or use a different email"
    );
  }

  return await prisma.user.create({
    data: {
      email,
      password: saltAndHashPassword(password),
    },
  });
}

export async function createProfile(
  email: string,
  firstName: string,
  lastName: string,
  image: string
) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("You are not authorized to create a profile");
  }

  return await prisma.profile.create({
    data: {
      id: `profile_${user.id}`,
      userId: user.id,
      firstName: firstName,
      lastName: lastName,
      email: user.email,
      image: image,
    },
  });
}
