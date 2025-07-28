import { NextResponse } from "next/server";
import axios from "axios";
import { updateAccountMoney } from "@/services/accountService";
import db from "@/config/db";

export async function POST(req) {
  try {
    const api = `https://api.sieuthicode.net/historyapivcbv2/${process.env.TOKEN_ATM}`;
    console.log("api", api);
    const response = await fetch(api);
    const data = await response.json();
    console.log("response", data);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("❌ Lỗi khi xử lý auto deposit:", error);
    return NextResponse.json({ message: "Lỗi xử lý auto deposit" }, { status: 500 });
  }
}
