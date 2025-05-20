import db from "@/config/db";
import { getUserById, getUserByUsernamePassword } from "@/services/accountService";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET || "";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ message: "Vui lòng nhập username và password." }, { status: 400 });
    }

    const user = await getUserByUsernamePassword(username, password);
    if (user.length === 0) {
      return NextResponse.json({ message: "Sai tài khoản hoặc mật khẩu." }, { status: 401 });
    }

    const dataUser = await getUserById(user[0].id);
    // Tạo JWT Token
    const token = jwt.sign(dataUser, SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });

    // Lấy thông tin đầy đủ của user
    const userData = await getUserById(user[0].id);

    return NextResponse.json({ message: "Đăng nhập thành công.", token, user: userData }, { status: 200 });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    return NextResponse.json({ message: "Lỗi máy chủ." }, { status: 500 });
  }
}
