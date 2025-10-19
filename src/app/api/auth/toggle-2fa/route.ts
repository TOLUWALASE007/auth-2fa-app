import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, enable } = await req.json();

    const user = await User.findOneAndUpdate(
      { email },
      { twoFactorEnabled: enable },
      { new: true }
    );

    if (!user) return Response.json({ message: "User not found" }, { status: 404 });

    return Response.json({
      message: `2FA ${enable ? "enabled" : "disabled"} successfully`,
      twoFactorEnabled: user.twoFactorEnabled,
    });
  } catch (error) {
    console.error("❌ Toggle 2FA error:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
