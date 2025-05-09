import db from "@/config/db";
import { updateAccountMoney } from "@/services/accountService";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const status = parseInt(searchParams.get("status"));
    const message = searchParams.get("message");
    const request_id = searchParams.get("request_id");
    const declared_value = parseFloat(searchParams.get("declared_value")) || null;
    const value = parseFloat(searchParams.get("value")) || null;
    const amount = parseFloat(searchParams.get("amount")) || null;
    const code = searchParams.get("code");
    const serial = searchParams.get("serial");
    const telco = searchParams.get("telco");
    const trans_id = searchParams.get("trans_id");

    if (!trans_id) {
      console.error("Trans_id không tồn tại");
      return NextResponse.json({ error: "Missing trans_id" }, { status: 400 });
    }

    // Tìm bản ghi `napthe` theo `trans_id`
    const naptheQuery = "SELECT account_id FROM napthe WHERE trans_id = ?";
    const naptheRecord = await db.query(naptheQuery, [trans_id]);

    if (naptheRecord.length === 0) {
      console.error("Không tìm thấy trans_id");
      return NextResponse.json({ error: "Không tìm thấy trans_id" }, { status: 404 });
    }
    console.log("naptheRecord", naptheRecord);

    const accountId = naptheRecord[0][0].account_id;
    console.log("accountId", accountId);

    // Cập nhật bản ghi trong bảng `napthe`
    const updateNaptheQuery = `
      UPDATE napthe 
      SET status = ?, message = ?, declared_value = ?, value = ?, amount = ?, code = ?, serial = ?, telco = ?
      WHERE request_id = ?
    `;
    const valuesUpdateNapThe = [status, message, declared_value, value, amount, code, serial, telco, request_id];

    const result = await db.query(updateNaptheQuery, valuesUpdateNapThe);

    if (result.affectedRows === 0) {
      console.error("Cập nhật napthe thất bại");
      return NextResponse.json({ error: "Update failed napthe" }, { status: 500 });
    }

    // Nếu `status` là 1 hoặc 2, cập nhật số dư tài khoản bằng hàm updateAccountBalance
    if (status === 1 || status === 2) {
      const updatedUser = await updateAccountMoney(accountId, value, true , true);
      console.log(`Tài khoản ${accountId} vừa nạp ${value} VNĐ thành công!`, updatedUser);
    }

    console.log("Xử lý callback nạp thẻ thành công!");
    return NextResponse.json({ success: true, message: "Record updated successfully" });
  } catch (error) {
    console.error("Lỗi hệ thống:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
