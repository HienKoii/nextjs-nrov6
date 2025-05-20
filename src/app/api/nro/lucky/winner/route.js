import { NextResponse } from "next/server";
import db from "@/config/db";
import { getUserById } from "@/services/accountService";
import { getItemTemplate } from "@/services/itemService";

// Lấy top 20 lịch sử quay trúng thưởng (mới nhất)
export async function GET() {
  try {
    const sql = `SELECT playerId, item, created_at FROM lucky_wheel_winners ORDER BY created_at DESC LIMIT 20`;
    const [rows] = await db.query(sql);
    const result = [];
    for (const row of rows) {
      console.log('row', row)
      try {
        const player = await getUserById(row.playerId);
        console.log('row.playerId', row.playerId)
        console.log('player', player)
        if (!player) continue;
        const itemArr = JSON.parse(row.item);
        console.log('itemArr', itemArr)
        const itemId = itemArr[0];
        console.log('itemId', itemId)
        const quantity = itemArr[1];
        console.log('quantity', quantity)
        const itemTemplate = await getItemTemplate(itemId);
        console.log('itemTemplate', itemTemplate)
        if (!itemTemplate) continue;
        result.push({
          avatar: player.avatar,
          cName: player.cName,
          itemId,
          itemName: itemTemplate.name,
          quantity,
          created_at: row.created_at,
        });
      } catch (e) {
        continue;
      }
    }
    console.log('result', result)
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Thêm mới 1 bản ghi lịch sử quay trúng thưởng
export async function POST(req) {
  try {
    const { playerId, item } = await req.json();
    if (!playerId || !item) {
      return NextResponse.json({ error: "Missing playerId or item" }, { status: 400 });
    }
    await db.query("INSERT INTO lucky_wheel_winners (playerId, item) VALUES (?, ?)", [playerId, item]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
