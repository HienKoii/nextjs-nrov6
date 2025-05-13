import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getUserById } from "@/services/accountService";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");
    console.log("Auth header:", authHeader);
    if (!authHeader) return NextResponse.json({ message: "Không có token" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Lấy thông tin user từ ID
    const userData = await getUserById(decoded.id);
    if (!userData) return NextResponse.json({ message: "Người dùng không tồn tại" }, { status: 404 });

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json({ message: "Token không hợp lệ" }, { status: 401 });
  }
}
