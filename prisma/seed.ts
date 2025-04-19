import { PrismaClient, Prisma } from "../app/generated/prisma";
const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    email: "dee@gmail.com",
    profile: {
      create: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        links: {
          create: [
            {
              platform: "Twitter",
              link: "https://twitter.com/johndoe",
            },
            {
              platform: "GitHub",
              link: "https://github.com/johndoe",
            },
          ],
        },
      },
    },
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
