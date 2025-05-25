import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { MD5 } from "crypto-js";
import axios from "axios";
import jwt from "jsonwebtoken";
import db from "@/lib/db";

export async function POST(req) {
  try {
    // Lấy token xác thực người dùng
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Bạn cần đăng nhập để thực hiện hành động này" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json({ message: "Token không hợp lệ. Vui lòng đăng nhập lại" }, { status: 403 });
    }

    // Lấy dữ liệu từ body
    const { code, serial, telco, amount } = await req.json();
    if (!code || !serial || !telco || !amount) {
      return NextResponse.json({ message: "Vui lòng nhập đủ thông tin thẻ" }, { status: 400 });
    }

    const requestId = nanoid(10);
    const signature = MD5(process.env.PARTNER_KEY + code + serial).toString();

    const payload = {
      code,
      serial,
      telco,
      amount,
      sign: signature,
      partner_id: process.env.PARTNER_ID,
      request_id: requestId,
      command: "charging",
    };

    // Gọi API bên thứ ba
    const apiUrl = `https://${process.env.URL_API_CARD}/chargingws/v2`;
    const { data } = await axios.post(apiUrl, payload, {
      headers: { "Content-Type": "application/json" },
    });
    if (!data) {
      return NextResponse.json({ message: "Lỗi từ hệ thống nạp thẻ" }, { status: 500 });
    }

    // Lưu vào DB
    const sql = `
      INSERT INTO napthe (account_id, trans_id, request_id, amount, value, declared_value, telco, serial, code, status, message)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [decoded.id, data.trans_id, requestId, data.amount, data.value, data.declared_value, data.telco, data.serial, data.code, data.status, data.message];
    await db.query(sql, values);
    console.log("data", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Lỗi hệ thống:", error);
    return NextResponse.json({ message: "Lỗi hệ thống, vui lòng thử lại sau" }, { status: 500 });
  }
}
