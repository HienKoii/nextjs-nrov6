import db from "@/config/db";
import { createHistory } from "./historyService";

// Lấy thông tin user từ bảng users
async function getUserFromUsers(userId) {
  const sql = `SELECT * FROM account WHERE id = ?`;
  const [user] = await db.query(sql, [userId]);
  return user?.[0] || null;
}

export async function getArrItemMores(playerId) {
  const [row] = await db.query("SELECT * FROM arritemmores WHERE playerId = ?", [playerId]);
  return row?.[0] || null;
}

export async function getArrItemBoxGift(playerId) {
  const [row] = await db.query("SELECT * FROM player_box_gift WHERE player_id = ?", [playerId]);
  return JSON.parse(row?.[0]?.items_box_gift) || null;
}

// Lấy thông tin player từ bảng player
export async function getPlayerInfo(userId) {
  const sql = "SELECT * FROM player WHERE account_id = ?";
  const [pl] = await db.query(sql, [userId]);
  return pl?.[0] || null;
}

// Lấy thông tin avatar từ bảng avatar
export async function getAvatarInfo(headId) {
  if (!headId) return null;
  const sql = "SELECT avatar_id FROM head_avatar WHERE head_id = ?";
  const [avatar] = await db.query(sql, [headId]);
  return avatar?.[0]?.avatar_id;
}

export async function getPasswordById(id) {
  if (!id) return null;
  const [row] = await db.query(`SELECT password FROM account WHERE id = ?`, [id]);
  return row;
}

export async function updatePasswordById(newPassword, id) {
  await db.query(`UPDATE account SET password = ? WHERE id = ?`, [newPassword, id]);
}

export async function getUsernameOrEmail(username, email) {
  const sql = "SELECT username, email FROM account WHERE username = ? OR email = ?";
  const [existingUser] = await db.query(sql, [username, email]);
  console.log('existingUser', existingUser)
  return existingUser;
}

export async function createUser(username, email, password) {
  const sql = "INSERT INTO account (username, email, password) VALUES (?, ?, ?)";

  const [result] = await db.query(sql, [username, email, password]);
  return result;
}

export async function getUserByUsernamePassword(username, password) {
  if (!username) return null;
  if (!password) return null;
  const sql = "SELECT * FROM account WHERE username = ? AND password = ?";
  const [user] = await db.query(sql, [username, password]);
  return user || null;
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
      playerId: player?.id || null,
      cName: player?.name || null,
      gender: player?.gender || null,
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
    const updateFields = [`vnd = vnd + ?`];

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

      // // Ghi lại lịch sử giao dịch
      // await createHistory(user.username, totalMoney, `${user.username} vừa được cộng tiền trên web thành công!`);

      return user;
    }

    return null;
  } catch (error) {
    console.error(`Lỗi khi cập nhật số dư tài khoản ${accountId}:`, error);
    throw error;
  }
}
