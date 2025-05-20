// src/app/api/news/route.js
import db from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const offset = (page - 1) * limit;

    // Lấy tổng số bài viết
    const [countResult] = await db.query("SELECT COUNT(*) as total FROM news");
    const total = countResult[0].total;

    // Lấy danh sách bài viết
    const [rows] = await db.query(
      `
      SELECT 
        *
      FROM news n
      LIMIT ? OFFSET ?
    `,
      [limit, offset]
    );

    // Parse images từ JSON string sang array
    const news = rows.map((row) => ({
      ...row,
      images: JSON.parse(row.images || "[]"),
    }));

    return NextResponse.json({
      news,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Lỗi khi lấy danh sách tin tức", details: error.message }, { status: 500 });
  }
}
