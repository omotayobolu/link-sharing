import { PrismaClient, Prisma } from "../app/generated/prisma";
const prisma = new PrismaClient();

import { hash } from "bcryptjs";

async function main() {
  const passwordHash = await hash("Password123!", 10);

  const userData = await prisma.user.create({
    data: {
      email: "johndoe@example.com",
      password: passwordHash,
      profile: {
        create: {
          id: "profile-john-doe",
          firstName: "John",
          lastName: "Doe",
          email: "johndoe@example.com",
          links: {
            create: [
              {
                platform: "GitHub",
                link: "https://github.com/johndoe",
              },
              {
                platform: "Twitter",
                link: "https://twitter.com/johndoe",
              },
              {
                platform: "LinkedIn",
                link: "https://linkedin.com/in/johndoe",
              },
            ],
          },
        },
      },
    },
    include: {
      profile: {
        include: {
          links: true,
        },
      },
    },
  });

  console.log("Users created:", { user1: userData.email });
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Seed completed");
  });
