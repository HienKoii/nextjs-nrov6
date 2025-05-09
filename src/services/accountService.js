import db from "@/config/db";
import { createHistory } from "./historyService";
export async function getUserById(userId) {
  const [user] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
  if (!user || user.length === 0) return null;

  const [pl] = await db.query("SELECT * FROM player WHERE playerId = ?", [user[0].id]);

  return {
    ...user[0],
    password: "đã che ^^",
    name: pl[0]?.name || null,
    gender: pl[0]?.gender || null,
  };
}

export async function getAllUsers(page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  // Lấy danh sách user với phân trang
  const [users] = await db.query("SELECT id, username, email, vnd, created_at FROM account ORDER BY created_at DESC LIMIT ? OFFSET ?", [limit, offset]);

  // Đếm tổng số user để hỗ trợ phân trang
  const [[{ total }]] = await db.query("SELECT COUNT(*) AS total FROM account");

  return {
    users,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function updateAccountMoney(accountId, value, isActive, isTopUp) {
  try {
    const totalMoney = value * (parseFloat(process.env.PROMO_RATE) || 1);

    // Xây dựng câu lệnh SQL động dựa trên isActive và isTopUp
    const updateFields = [`money = money + ?`];

    if (isTopUp) {
      updateFields.push(`tongnap = tongnap + ?`, `naptuan = naptuan + ?`);
    }

    if (isActive) {
      updateFields.push(`active = 1`);
    }

    const updateAccountQuery = `
      UPDATE account 
      SET ${updateFields.join(", ")}
      WHERE id = ?
    `;

    // Chuẩn bị giá trị tham số cho câu lệnh SQL
    const queryValues = [totalMoney];

    if (isTopUp) {
      queryValues.push(totalMoney, totalMoney);
    }

    queryValues.push(accountId);

    await db.query(updateAccountQuery, queryValues);

    console.log(`Tài khoản ${accountId} vừa nạp ${totalMoney} VNĐ thành công!`);

    // Lấy thông tin tài khoản sau khi cập nhật
    const [updatedUser] = await db.query("SELECT * FROM account WHERE id = ?", [accountId]);

    if (updatedUser.length > 0) {
      const user = updatedUser[0];

      // Ghi lại lịch sử giao dịch
      await createHistory(user.username, totalMoney, `${user.username} vừa được cộng tiền trên web thành công!`);

      return user;
    }

    return null;
  } catch (error) {
    console.error(`Lỗi khi cập nhật số dư tài khoản ${accountId}:`, error);
    throw error;
  }
}
