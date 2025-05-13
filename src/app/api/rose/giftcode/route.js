import db from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const [rows] = await db.query("SELECT code, `limit`, str FROM giftcode");
    return NextResponse.json({ giftcodes: rows });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
