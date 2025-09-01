import { getToken } from "@/actions/parcel.actions";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url).searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "Missing url parameter" },
      { status: 400 }
    );
  }

  const token = await getToken()
  try {
    const response = await fetch(url, {
      credentials: "include", headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch PDF" },
        { status: response.status }
      );
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("pdf")) {
      return NextResponse.json(
        { error: "URL does not point to a PDF" },
        { status: 400 }
      );
    }

    const buffer = await response.arrayBuffer();

    return new NextResponse(Buffer.from(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=file.pdf",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
