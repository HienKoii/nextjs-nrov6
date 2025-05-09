import db from "@/config/db";
import { verifyToken } from "@/services/tokenService";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { decoded, error } = verifyToken(req);
  if (error) return error;
  try {
    const { is_admin } = decoded;
    if (!is_admin) {
      return NextResponse.json({ message: "Không có quyền truy cập" }, { status: 403 });
    }
    // Lấy tổng số tài khoản
    const [totalAccounts] = await db.query("SELECT COUNT(*) AS total FROM account");

    // Lấy tổng số player
    const [totalPlayers] = await db.query("SELECT COUNT(*) AS total FROM player");

    // Lấy tổng doanh thu từ bảng `napthe` và `napatm`
    const [naptheRevenue] = await db.query("SELECT IFNULL(SUM(amount), 0) AS total FROM napthe WHERE status = 1");
    const [napatmRevenue] = await db.query("SELECT IFNULL(SUM(amount), 0) AS total FROM napatm");

    // Tổng doanh thu
    const totalRevenue = Number(naptheRevenue[0]?.total || 0) + Number(napatmRevenue[0]?.total || 0);

    return NextResponse.json({
      success: true,
      data: {
        total_accounts: totalAccounts[0].total,
        total_players: totalPlayers[0].total,
        total_revenue: totalRevenue,
      },
    });
  } catch (error) {
    console.error("Lỗi khi lấy thống kê:", error);
    return NextResponse.json({ success: false, message: "Lỗi hệ thống" }, { status: 500 });
  }
}
