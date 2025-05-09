/*
CREATE TABLE napatm (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_id VARCHAR(255) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    transaction_date DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES account(id),
    INDEX idx_transaction_id (transaction_id),
    INDEX idx_user_id (user_id)
);
*/

import { NextResponse } from "next/server";
import db from "@/config/db"; // Kết nối database MySQL
import axios from "axios";
import { updateAccountMoney } from "@/services/accountService";

export async function POST(req) {
  try {
    // Gọi API lấy lịch sử giao dịch
    const response = await axios.get(`https://api.sieuthicode.net/historyapivcbv2/${process.env.TOKEN_ATM}`);

    // Log dữ liệu API trả về để kiểm tra
    console.log("📢 API Response Data:", response.data);

    // Kiểm tra nếu `transactions` không tồn tại hoặc không phải là mảng
    const transactions = response.data?.transactions;

    if (!transactions) {
      console.error("🚫 Lỗi: API không trả về dữ liệu giao dịch!");
      return NextResponse.json({ message: "API không có dữ liệu giao dịch" }, { status: 500 });
    }

    if (!Array.isArray(transactions)) {
      console.error("🚫 Lỗi: transactions không phải là một mảng!", transactions);
      return NextResponse.json({ message: "Lỗi dữ liệu từ API" }, { status: 500 });
    }

    let count = 0;

    for (const transaction of transactions) {
      const { transactionID, amount, description, type, transactionDate } = transaction;

      if (type === "IN") {
        // Dùng regex để tìm ID user trong description (hỗ trợ cả "naptien" và "NAPTIEN") hihi
        const match = description?.match(/naptien (\d+)/i);

        if (match) {
          const userId = parseInt(match[1], 10);
          console.log(`🔍 Kiểm tra userId: ${userId}`);

          // Kiểm tra user có tồn tại không
          const user = await db.query("SELECT id FROM account WHERE id = ?", [userId]);

          if (user.length > 0) {
            // Kiểm tra xem giao dịch đã được xử lý chưa
            const checkExist = await db.query("SELECT * FROM napatm WHERE transaction_id = ?", [transactionID]);

            if (checkExist[0].length === 0) {
              console.log(`✅ Giao dịch ${transactionID} hợp lệ, tiến hành nạp tiền.`);

              // Cộng tiền vào tài khoản người dùng
              await updateAccountMoney(userId, amount, true, true);

              // Lưu lịch sử giao dịch vào database
              await db.query("INSERT INTO napatm (transaction_id, user_id, amount, transaction_date) VALUES (?, ?, ?, ?)", [transactionID, userId, amount, transactionDate]);

              count++;
            } else {
              console.log(`⚠️ Giao dịch ${transactionID} đã tồn tại, bỏ qua.`);
            }
          } else {
            console.log(`🚫 User ID ${userId} không tồn tại, bỏ qua giao dịch.`);
          }
        } else {
          console.log("🚫 Không tìm thấy ID user trong mô tả giao dịch.");
        }
      } else {
        console.log("🔄 Giao dịch không phải là nạp tiền, bỏ qua.");
      }
    }

    console.log(`✅ Hoàn thành xử lý. Đã cộng tiền cho ${count} giao dịch hợp lệ.`);
    return NextResponse.json({ message: `Đã cộng tiền cho ${count} giao dịch hợp lệ` }, { status: 200 });
  } catch (error) {
    console.error("❌ Lỗi khi xử lý auto deposit:", error);
    return NextResponse.json({ message: "Lỗi xử lý auto deposit" }, { status: 500 });
  }
}
