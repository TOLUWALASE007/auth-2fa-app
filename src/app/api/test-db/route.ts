import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find();
    return Response.json({ 
      count: users.length, 
      message: "Database connected successfully ✅",
      users: users.map(user => ({
        id: user._id,
        email: user.email,
        twoFactorEnabled: user.twoFactorEnabled
      }))
    });
  } catch (error) {
    console.error("Database test error:", error);
    return Response.json({ 
      error: "Database connection failed ❌",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
