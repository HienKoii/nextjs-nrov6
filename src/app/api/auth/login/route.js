import db from "@/config/db";
import { getUserById } from "@/services/accountService";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET || "";

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return NextResponse.json({ message: "Vui lòng nhập username và password." }, { status: 400 });
    }

    // Kiểm tra tài khoản trong database
    const [user] = await db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);
    if (user.length === 0) {
      return NextResponse.json({ message: "Sai tài khoản hoặc mật khẩu." }, { status: 401 });
    }

    // Tạo JWT Token
    const token = jwt.sign({ id: user[0].id, username: user[0].username, is_admin: user[0].is_admin }, SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });

    // Lấy thông tin đầy đủ của user
    const userData = await getUserById(user[0].id);

    return NextResponse.json({ message: "Đăng nhập thành công.", token, user: userData }, { status: 200 });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    return NextResponse.json({ message: "Lỗi máy chủ." }, { status: 500 });
  }
}
