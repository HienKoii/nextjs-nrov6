import db from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  const { id } = await context.params; // Lấy `id` từ URL
  if (!id) {
    return NextResponse.json({ message: "ID không hợp lệ" }, { status: 400 });
  }
  try {
    // Thực hiện truy vấn để lấy tất cả bài viết
    const [posts] = await db.query("SELECT * FROM posts WHERE id = ?", [id]);
    if (posts.length === 0) {
      return NextResponse.json({ message: "Không tìm thấy bài viết" }, { status: 404 });
    }
    // Trả về bài viết
    return NextResponse.json(posts[0], { status: 200 });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bài viết:", error);
    return NextResponse.json({ message: "Lỗi máy chủ. Không thể lấy danh sách bài viết." }, { status: 500 });
  }
}
