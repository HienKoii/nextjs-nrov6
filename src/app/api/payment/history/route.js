import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import db from "@/config/db";
export async function GET(req) {
  // Lấy token xác thực người dùng
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ message: "Bạn cần đăng nhập để thực hiện hành động này" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return NextResponse.json({ message: "Token không hợp lệ. Vui lòng đăng nhập lại" }, { status: 403 });
  }

  try {
    const { id } = decoded;

    const [historyAtm] = await db.query(`SELECT * FROM napatm WHERE user_id = ? ORDER BY created_at DESC`, [id]);

    return NextResponse.json(historyAtm, { status: 200 });
  } catch (error) {
    console.error("Error fetching napthe history:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
