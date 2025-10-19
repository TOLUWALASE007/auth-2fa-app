import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, code } = await req.json();

    if (!email || !code)
      return Response.json({ message: "Email and code are required" }, { status: 400 });

    const user = await User.findOne({ email });
    if (!user || !user.twoFactorEnabled)
      return Response.json({ message: "Invalid request" }, { status: 400 });

    if (!user.twoFactorCode || !user.twoFactorExpires)
      return Response.json({ message: "No active verification code" }, { status: 400 });

    // Check if expired
    if (new Date() > user.twoFactorExpires)
      return Response.json({ message: "Code expired" }, { status: 400 });

    // Check code match
    if (user.twoFactorCode !== code)
      return Response.json({ message: "Invalid code" }, { status: 401 });

    // Clear code after success
    user.twoFactorCode = undefined;
    user.twoFactorExpires = undefined;
    await user.save();

    const token = generateToken(user._id.toString());

    return Response.json({
      message: "2FA verification successful ✅",
      token,
      user: {
        id: user._id,
        email: user.email,
        twoFactorEnabled: user.twoFactorEnabled,
      },
    });
  } catch (error) {
    console.error("❌ Verify 2FA error:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
