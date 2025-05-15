import { NextResponse } from "next/server";
import db from "@/config/db";
import { getArrItemMores } from "@/services/accountService";

export async function POST(req) {
  try {
    const { playerId, itemMore } = await req.json();
    const arrItemMores = await getArrItemMores(playerId);

    const newArrItemMores = [...arrItemMores, itemMore];

    const sql = `UPDATE arritemmores SET arrItemMore = ? WHERE playerId = ?`;
    const values = [JSON.stringify(newArrItemMores), playerId];
    await db.query(sql, values);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const playerId = searchParams.get("playerId");
    if (!playerId) return NextResponse.json({ error: "Missing playerId" }, { status: 400 });
    const [rows] = await db.query("SELECT arrItemMore FROM arritemmores WHERE playerId = ?", [playerId]);
    if (!rows.length) return NextResponse.json({ arrItemMore: [] });
    let arrItemMore = [];
    try {
      arrItemMore = JSON.parse(rows[0].arrItemMore || "[]");
    } catch {
      arrItemMore = [];
    }
    return NextResponse.json({ arrItemMore });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
