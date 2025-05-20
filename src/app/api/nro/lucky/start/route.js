// /api/rose/user/update-lucky-money/route.js
import { NextResponse } from "next/server";
import db from "@/config/db";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    // Kiểm tra token
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Không có token" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ message: "Token không hợp lệ" }, { status: 401 });
    }


    const { userId, lucky, money } = await req.json();

    if (decoded.id !== userId) {
      return NextResponse.json({ message: "Không có quyền thực hiện thao tác này" }, { status: 403 });
    }

    await db.query("UPDATE account SET lucky = ?, vnd = (vnd- ?) WHERE id = ?", [lucky, money, userId]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
