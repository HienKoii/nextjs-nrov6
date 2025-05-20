import { NextResponse } from "next/server";
import db from "@/config/db";
import { getArrItemBoxGift } from "@/services/accountService";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    // Kiểm tra token
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Không có token" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ message: "Token không hợp lệ" }, { status: 401 });
    }

    const { playerId, itemMore } = await req.json();
    // Kiểm tra xem playerId có thuộc về user đang đăng nhập không

    if (decoded.id && decoded.playerId !== playerId) {
      return NextResponse.json({ message: "Không có quyền thực hiện thao tác này" }, { status: 403 });
    }

    const arrItemMores = await getArrItemBoxGift(playerId);
    const newArrItemMores = [...arrItemMores, itemMore];

    const sql = `UPDATE player_box_gift SET items_box_gift = ? WHERE player_id = ?`;
    const values = [JSON.stringify(newArrItemMores), playerId];
    await db.query(sql, values);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
