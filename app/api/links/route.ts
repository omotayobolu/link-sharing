import { addLinks } from "@/lib/db";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    console.log("UserId", userId);

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

    const links = await prisma.link.findMany({
      where: { profileId: profile.id },
    });

    return NextResponse.json(links);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, links } = await request.json();

    if (!userId || !links) {
      return NextResponse.json(
        {
          error: "Missing userId or links",
        },
        { status: 400 }
      );
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

    await prisma.link.deleteMany({
      where: { profileId: profile.id },
    });

    const linksToCreate = await addLinks(userId, profile.id, links);

    return NextResponse.json({
      message: "Links added successfully",
      links: linksToCreate,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const linkId = searchParams.get("linkId");
    const userId = searchParams.get("userId");

    if (!linkId || !userId) {
      return NextResponse.json(
        { error: "Missing linkId or userId" },
        { status: 400 }
      );
    }

    const link = await prisma.link.findUnique({
      where: { id: Number(linkId) },
    });

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    await prisma.link.delete({
      where: { id: Number(linkId) },
    });

    const profile = await prisma.profile.findUnique({
      where: { userId: userId },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "User's profile not found" },
        { status: 404 }
      );
    }

    const links = await prisma.link.findMany({
      where: { profileId: profile.id },
    });

    return NextResponse.json({
      message: "Link deleted successfully",
      links: links,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
