import db from "@/config/db";
import { createUser, getUsernameOrEmail } from "@/services/accountService";
import { isValid } from "@/utils";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Lấy dữ liệu từ request
    const { username, email, password, confirmPassword } = await request.json();

    // Kiểm tra dữ liệu đầu vào
    if (!username || !email || !password || !confirmPassword) {
      return NextResponse.json({ message: "Vui lòng nhập đủ các trường." }, { status: 400 });
    }

    if (!isValid(username) || !isValid(password)) {
      return NextResponse.json({ message: "Tài khoản và mật khẩu chỉ được chứa chữ cái, số và dấu gạch dưới (_)." }, { status: 400 });
    }

    if (username.length > 20 || password.length > 20) {
      return NextResponse.json({ message: "Tài khoản, mật khẩu không quá 20 ký tự." }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ message: "Hai mật khẩu không giống nhau." }, { status: 400 });
    }

    // Kiểm tra username hoặc email đã tồn tại chưa
    const existingUser = await getUsernameOrEmail(username, email);

    if (existingUser && existingUser.length > 0) {
      return NextResponse.json({ message: "Tài khoản hoặc email hoặc đã tồn tại." }, { status: 409 });
    }

    // Lưu mật khẩu vào database mà không mã hóa
    const create = await createUser(username, email, password);
    console.log("create", create);

    console.log(`Tài khoản ${username} đã được tạo thành công!`);
    return NextResponse.json({ message: `Tài khoản ${username} đăng ký thành công.` }, { status: 201 });
  } catch (error) {
    console.error("Lỗi trong quá trình đăng ký:", error);
    return NextResponse.json({ message: "Lỗi máy chủ. Vui lòng thử lại sau." }, { status: 500 });
  }
}
