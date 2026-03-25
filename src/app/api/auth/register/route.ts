import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";

export async function POST(req: Request) {
  try {
    const { name, email, password, role, phone } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const isStaff = role === "staff";
    
    const userData: any = {
      name,
      email,
      password: hashedPassword,
      role: role || "customer",
      phone: phone || "",
      isApproved: !isStaff,
    };

    if (isStaff) {
      userData.department = "Customer Service";
      userData.joinDate = new Date().toISOString().split('T')[0];
      userData.performance = 0;
      userData.customersServed = 0;
      userData.avgTime = "0 min";
      userData.satisfaction = 0;
    }

    const user = await User.create(userData);

    return NextResponse.json(
      {
        message: isStaff 
          ? "Registration successful! Your staff account is pending admin approval."
          : "Registration successful! You can now login.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isApproved: user.isApproved,
          department: user.department,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}