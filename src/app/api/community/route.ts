import { NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const gCode = process.env.NEXT_PUBLIC_G_CODE;

export async function GET(request: Request) {
  const res = await fetch(`${baseUrl}/hp/api/event?clubCode=${gCode}&page=0&size=10&post=true`);
  const data = await res.json();

  return NextResponse.json(data);
}
