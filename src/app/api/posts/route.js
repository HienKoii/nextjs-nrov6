import db from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Thực hiện truy vấn để lấy tất cả bài viết
    const [res] = await db.query("SELECT * FROM posts");

    // Trả về danh sách bài viết
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bài viết:", error);
    return NextResponse.json({ message: "Lỗi máy chủ. Không thể lấy danh sách bài viết." }, { status: 500 });
  }
}
