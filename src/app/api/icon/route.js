import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
  try {
    // Lấy id từ query (mặc định là 1 nếu không có id)
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id") || "1";

    // Tạo URL ảnh dựa trên id
    const imageUrl = `${process.env.ICONS_URL}${id}.png`;

    // Gửi request lấy ảnh bằng Axios
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

    // Trả về ảnh với Content-Type là image/png
    return new NextResponse(response.data, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400", // Cache 1 ngày
      },
    });
  } catch (error) {
    console.error("Lỗi khi lấy ảnh:", error);
    return NextResponse.json({ message: "Lỗi máy chủ. Không thể lấy ảnh." }, { status: 500 });
  }
}
