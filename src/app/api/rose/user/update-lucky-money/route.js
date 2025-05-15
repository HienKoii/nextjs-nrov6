// /api/rose/user/update-lucky-money/route.js
import { NextResponse } from "next/server";
import db from "@/config/db";

export async function POST(req) {
  try {
    const { userId, lucky, money } = await req.json();
    await db.query("UPDATE users SET lucky = ?, money = ? WHERE id = ?", [lucky, money, userId]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
