import { createProfile } from "@/lib/db";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: userId },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "User's profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(profile);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { email, firstName, lastName, image } = await request.json();
    console.log("Email", email);
    console.log(email, firstName, lastName, image);

    if (!firstName || !lastName || !email || !image) {
      return NextResponse.json(
        {
          error: "Invalid profile details",
        },
        { status: 400 }
      );
    }

    const profile = await createProfile(email, firstName, lastName, image);
    return NextResponse.json(
      { message: "Profile created!", profile },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
