// src/app/api/news/[id]/route.js
import db from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  try {
    const id = context.params.id;

    const [rows] = await db.query(
      `
      SELECT 
        n.id,
        n.title,
        n.content,
        n.images,
        n.created_at,
        n.updated_at,
        n.author
      FROM news n
      WHERE n.id = ?
    `,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Không tìm thấy tin tức" }, { status: 404 });
    }

    // Parse images từ JSON string sang array
    let images = [];
    try {
      images = rows[0].images ? JSON.parse(rows[0].images) : [];
    } catch (e) {
      console.error("Error parsing images:", e);
      images = [];
    }

    const news = {
      ...rows[0],
      images: images,
    };

    return NextResponse.json(news);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Lỗi khi lấy chi tiết tin tức", details: error.message }, { status: 500 });
  }
}
