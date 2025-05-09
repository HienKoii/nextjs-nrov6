import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import db from "@/config/db";

export async function POST(req) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1]; // Lấy token từ header
    if (!token) {
      return NextResponse.json({ message: "Vui lòng đăng nhập" }, { status: 401 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { is_admin, username } = decoded;
    const data = await req.json();
    
    if (!is_admin) {
      return NextResponse.json({ message: "Không có quyền truy cập" }, { status: 401 });
    }

    // Kiểm tra các trường hợp thiếu dữ liệu
    if (!data.tieude || !data.noidung) {
      return NextResponse.json({ message: "Vui lòng điền đầy đủ thông tin tiêu đề và nội dung" }, { status: 400 });
    }

    // Thêm bài viết mới vào cơ sở dữ liệu
    const sql = "INSERT INTO posts (tieude, noidung, hot, new, image ,  username) VALUES (?, ?, ? , ?, ?, ?)";
    const values = [data.tieude, data.noidung, data.hot, data.new, JSON.stringify(data.images), username];
    await db.query(sql, values);

    // Trả về kết quả sau khi thêm bài viết thành công
    return NextResponse.json({ message: "Đăng bài thành công" }, { status: 201 });
  } catch (error) {
    console.error("Lỗi khi tạo bài viết:", error);
    return NextResponse.json({ message: "Lỗi máy chủ" }, { status: 500 });
  }
}
