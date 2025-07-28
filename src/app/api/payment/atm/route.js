import { NextResponse } from "next/server";
import axios from "axios";
import { updateAccountMoney } from "@/services/accountService";
import db from "@/config/db";

export async function POST(req) {
  try {
    const api = `https://api.sieuthicode.net/historyapivcbv2/${process.env.TOKEN_ATM}`;
    const response = await axios.get(api);
    console.log("response", response);

    return NextResponse.json({ message: "Auto deposit" }, { status: 200 });
  } catch (error) {
    console.error("❌ Lỗi khi xử lý auto deposit:", error);
    return NextResponse.json({ message: "Lỗi xử lý auto deposit" }, { status: 500 });
  }
}
