import db from "@/config/db";
import { createHistory } from "./historyService";

// Lấy thông tin user từ bảng users
async function getUserFromUsers(userId) {
  const [user] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
  return user?.[0] || null;
}

// Lấy thông tin player từ bảng player
async function getPlayerInfo(userId) {
  const [pl] = await db.query("SELECT * FROM player WHERE playerId = ?", [userId]);
  return pl?.[0] || null;
}

// Lấy thông tin avatar từ bảng avatar
async function getAvatarInfo(headId) {
  if (!headId) return null;

  const [avatar] = await db.query("SELECT idAvatar FROM head WHERE idHead = ?", [headId]);
  return avatar?.[0]?.idAvatar || null;
}

// Hàm chính để lấy thông tin user
export async function getUserById(userId) {
  try {
    // Lấy thông tin cơ bản của user
    const user = await getUserFromUsers(userId);
    if (!user) return null;

    // Lấy thông tin player
    const player = await getPlayerInfo(user.id);

    // Lấy thông tin avatar nếu có
    const idAvatar = await getAvatarInfo(player?.head);

    // Trả về object kết hợp thông tin
    return {
      ...user,
      password: "đã che ^^",
      cName: player?.cName || null,
      gender: player?.cgender || null,
      head: player?.head || null,
      avatar: idAvatar,
    };
  } catch (error) {
    console.error("Lỗi khi lấy thông tin user:", error);
    throw error;
  }
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
