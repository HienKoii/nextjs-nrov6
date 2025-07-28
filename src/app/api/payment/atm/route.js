// app/api/auto-deposit/route.ts
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    if (!process.env.TOKEN_ATM) {
      console.error("❌ TOKEN_ATM chưa được cấu hình!");
      return NextResponse.json({ message: "Server misconfiguration" }, { status: 500 });
    }

    const api = `https://api.sieuthicode.net/historyapivcbv2/${process.env.TOKEN_ATM}`;
    const response = await fetch(api, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; PonyBot/1.0)",
      },
    });

    if (!response.ok) {
      throw new Error(`API lỗi: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Auto deposit data:", data.transactions);

    return NextResponse.json(data.transactions, { status: 200 });
  } catch (error) {
    console.error("❌ Lỗi khi xử lý auto deposit:", error);
    return NextResponse.json({ message: "Lỗi xử lý auto deposit" }, { status: 500 });
  }
}
