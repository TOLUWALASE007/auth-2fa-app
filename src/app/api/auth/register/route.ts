import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json({ message: "Email and password are required" }, { status: 400 });
    }

    if (password.length < 6) {
      return Response.json({ message: "Password must be at least 6 characters long" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({ email, password: hashedPassword });

    return Response.json({ message: "User registered successfully ✅", userId: newUser._id }, { status: 201 });
  } catch (error) {
    console.error("❌ Register error:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
