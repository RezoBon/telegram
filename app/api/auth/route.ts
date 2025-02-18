import { encrypt, SESSION_DURATION } from "@/utils/session";
import { validateTelegramWebAppData } from "@/utils/telegramAuth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { initData } = await request.json(); // اصلاح: استفاده از destructuring

    const validationResult = validateTelegramWebAppData(initData);

    if (validationResult.validatedData) {
        console.log("validation result: ", validationResult);
        const user = { telegramId: validationResult.user.id };

        // ایجاد یک سشن جدید
        const expires = new Date(Date.now() + SESSION_DURATION);
        const session = await encrypt({ user, expires });

        // ایجاد یک پاسخ جدید
        const response = NextResponse.json({ message: 'Authentication successful' });

        // تنظیم کوکی در پاسخ
        response.cookies.set("session", session, {
            expires: expires, // زمان انقضا
            httpOnly: true, // فقط برای دسترسی از سمت سرور
        });

        return response;
    } else {
        return NextResponse.json({ message: validationResult.message }, { status: 401 });
    }
}