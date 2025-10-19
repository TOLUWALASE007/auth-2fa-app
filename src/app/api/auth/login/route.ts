import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { comparePassword, generateToken } from "@/lib/auth";
import { generate2FACode, codeExpiryTime } from "@/lib/2fa";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json({ message: "Email and password are required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return Response.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return Response.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // --- Handle 2FA ---
    if (user.twoFactorEnabled) {
      const code = generate2FACode();
      user.twoFactorCode = code;
      user.twoFactorExpires = codeExpiryTime();
      await user.save();

      // (Optional: send via email/SMS; here we just return it for testing)
      return Response.json({
        message: "2FA required. Enter verification code.",
        requires2FA: true,
        code, // ⚠️ for dev testing only — remove in production
      });
    }

    // --- Normal login ---
    const token = generateToken(user._id.toString());
    return Response.json({
      message: "Login successful ✅",
      token,
      user: {
        id: user._id,
        email: user.email,
        twoFactorEnabled: user.twoFactorEnabled,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
