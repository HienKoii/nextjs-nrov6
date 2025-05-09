import db from "@/config/db";
import { verifyToken } from "@/services/tokenService";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const { decoded, error } = verifyToken(req);
  if (error) return error;

  const { is_admin } = decoded;
  if (!is_admin) {
    return NextResponse.json({ message: "Không có quyền truy cập" }, { status: 403 });
  }

  try {
    const params = await context.params;
    const { type } = params;

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = (page - 1) * limit;

    let data = null;
    let total = 0;

    switch (type) {
      case "account":
        const [countAccounts] = await db.query("SELECT COUNT(*) as total FROM account");
        total = countAccounts[0].total;

        const [accounts] = await db.query("SELECT * FROM account LIMIT ? OFFSET ?", [limit, offset]);
        data = accounts;
        break;

      case "player":
        const [countPlayers] = await db.query("SELECT COUNT(*) as total FROM player");
        total = countPlayers[0].total;

        const [players] = await db.query("SELECT * FROM player LIMIT ? OFFSET ?", [limit, offset]);
        data = players;
        break;

      case "revenue":
        // Lấy tổng số bản ghi
        const [countRevenue] = await db.query(
          `SELECT COUNT(*) as total FROM (
            SELECT id FROM napatm
            UNION ALL
            SELECT id FROM napthe
          ) as combined`
        );
        total = countRevenue[0].total;

        // Lấy dữ liệu từ cả hai bảng
        const [revenues] = await db.query(
          `SELECT account_id,  declared_value, created_at, 'Nạp thẻ' as type FROM napthe
           UNION ALL
           SELECT  user_id, amount, created_at, 'Nạp Atm' as type FROM napatm
           ORDER BY created_at DESC
           LIMIT ? OFFSET ?`,
          [limit, offset]
        );
        data = revenues;
        break;

      default:
        return NextResponse.json({ message: "Loại dữ liệu không hợp lệ" }, { status: 400 });
    }

    return NextResponse.json(
      {
        data,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    return NextResponse.json({ message: "Lỗi máy chủ. Không thể lấy dữ liệu." }, { status: 500 });
  }
}
