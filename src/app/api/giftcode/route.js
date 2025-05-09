import db from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Lấy danh sách giftcode
    const [giftcodes] = await db.query("SELECT * FROM giftcode");

    // Lặp qua từng giftcode để lấy thông tin chi tiết
    for (let giftcode of giftcodes) {
      if (giftcode.detail) {
        try {
          // Chuyển chuỗi JSON thành object
          const detailData = JSON.parse(giftcode.detail);

          // Lấy danh sách id từ detail
          const itemIds = detailData.map((item) => item.id);

          if (itemIds.length > 0) {
            // Truy vấn bảng item_template để lấy name và icon dựa vào id
            const [items] = await db.query(`SELECT id, NAME, icon_id FROM item_template WHERE id IN (?)`, [itemIds]);
        
            // Gán name và icon vào detail
            detailData.forEach((item) => {
              const matchedItem = items.find((i) => i.id === item.id);
              if (matchedItem) {
                item.name = matchedItem.NAME;
                item.icon = matchedItem.icon_id;
              }
            });
          }

          // Cập nhật lại giftcode.detail sau khi đã thêm name và icon
          giftcode.detail = detailData;
        } catch (err) {
          console.error("Lỗi khi xử lý detail:", err);
        }
      }
    }

    // Trả về danh sách giftcode đã cập nhật
    return NextResponse.json(giftcodes, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách giftcode:", error);
    return NextResponse.json({ message: "Lỗi máy chủ. Không thể lấy danh sách giftcode." }, { status: 500 });
  }
}
