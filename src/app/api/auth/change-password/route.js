import db from "@/config/db";
import { isValid } from "@/lib/utils";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return NextResponse.json({ message: "Bạn cần đăng nhập để thực hiện hành động này" }, { status: 401 });
  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
  try {
    const { currentPassword, newPassword, confirmNewPassword } = await req.json();

    // Kiểm tra dữ liệu nhập
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return NextResponse.json({ message: "Vui lòng nhập đầy đủ các trường" }, { status: 400 });
    }

    if (!isValid(newPassword) || !isValid(confirmNewPassword)) {
      return NextResponse.json({ message: "Mật khẩu không hợp lệ" }, { status: 400 });
    }

    if (newPassword !== confirmNewPassword) {
      return NextResponse.json({ message: "Xác nhận mật khẩu không trùng nhau" }, { status: 400 });
    }

    if (newPassword === currentPassword) {
      return NextResponse.json({ message: "Mật khẩu mới phải khác mật khẩu hiện tại" }, { status: 400 });
    }

    // Kiểm tra mật khẩu hiện tại
    const [rows] = await db.query("SELECT password FROM users WHERE id = ?", [decoded.id]);
    if (rows.length === 0 || rows[0].password !== currentPassword) {
      return NextResponse.json({ message: "Mật khẩu hiện tại không đúng" }, { status: 401 });
    }

    // Cập nhật mật khẩu mới
    await db.query("UPDATE users SET password = ? WHERE id = ?", [newPassword, decoded.id]);

    return NextResponse.json({ message: "Đổi mật khẩu thành công" }, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi đổi mật khẩu:", error);
    return NextResponse.json({ message: "Lỗi hệ thống" }, { status: 500 });
  }
}
