import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function verifyToken(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return { error: NextResponse.json({ message: "Không có token" }, { status: 401 }) };
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { decoded };
  } catch (error) {
    return { error: NextResponse.json({ message: "Token không hợp lệ" }, { status: 403 }) };
  }
}
