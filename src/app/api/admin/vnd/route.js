import { NextResponse } from "next/server";
import db from "@/config/db";
import { verifyToken } from "@/services/tokenService";
import { updateAccountMoney } from "@/services/accountService";
export async function POST(req) {
  const { amount, identifier, isUsername } = await req.json();
  const numericAmount = Number(amount); // Chuyển đổi amount thành số

  // Kiểm tra token
  const { decoded, error } = verifyToken(req);
  if (error) return error; // Trả về lỗi nếu token không hợp lệ

  try {
    const { is_admin } = decoded;
    if (!is_admin) {
      return NextResponse.json({ message: "Không có quyền truy cập" }, { status: 403 });
    }

    const conditionField = isUsername ? "username" : "id";
    const [user] = await db.query(`SELECT * FROM account WHERE ${conditionField} = ?`, [identifier]);

    if (user.length === 0) {
      return NextResponse.json({ message: "Không tìm thấy người dùng" }, { status: 404 });
    }

    // Cộng tiền vào tài khoản người dùng
    await updateAccountMoney(user[0].id, numericAmount, false, false);

    return NextResponse.json({ message: `Đã cộng ${numericAmount} VND vào tài khoản của ${identifier}` }, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi cộng tiền:", error);
    return NextResponse.json({ message: "Lỗi server. Vui lòng thử lại sau." }, { status: 500 });
  }
}
