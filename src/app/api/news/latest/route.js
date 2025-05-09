// src/app/api/news/route.js
import db from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT n.*, u.full_name as author_name 
      FROM news n
      JOIN users u ON n.author = u.username
      ORDER BY n.created_at DESC 
      LIMIT 4
    `);

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi lấy tin tức mới nhất" }, { status: 500 });
  }
}
