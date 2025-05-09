import db from "@/config/db";

export async function createHistory(username, amount, reason) {
  try {
    const sql = "INSERT INTO history_gold (name, gold, lydo) VALUES (?, ?, ?)";
    const values = [username, amount, reason];

    await db.query(sql, values);
    console.log(`Lịch sử giao dịch: ${username} - ${amount} VNĐ - ${reason}`);
  } catch (error) {
    console.error(`Lỗi khi lưu lịch sử giao dịch của ${username}:`, error);
    throw error;
  }
}
