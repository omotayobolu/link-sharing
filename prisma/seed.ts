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
          id: "profile_john-doe",
          firstName: "John",
          lastName: "Doe",
          email: "johndoe@example.com",
          image: "test.png",
          links: {
            create: [
              {
                platform: { id: "github", value: "GitHub", icon: "github.svg" },
                link: "https://github.com/johndoe",
              },
              {
                platform: { id: "github", value: "GitHub", icon: "github.svg" },
                link: "https://twitter.com/johndoe",
              },
              {
                platform: { id: "github", value: "GitHub", icon: "github.svg" },
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
