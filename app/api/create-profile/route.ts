import { createProfile } from "@/lib/db";
import { NextResponse } from "next/server";

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
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
