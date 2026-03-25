import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    
    const user = await User.findById(session.user.id).select("-password");
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      profile: {
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        language: user.language || "en",
        timezone: user.timezone || "Africa/Lagos"
      },
      notifications: {
        sms: user.notifications?.sms ?? false,
        email: user.notifications?.email ?? false,
        whatsapp: user.notifications?.whatsapp ?? false,
        queueUpdates: user.notifications?.queueUpdates ?? true,
        appointmentReminders: user.notifications?.appointmentReminders ?? true,
        marketingEmails: user.notifications?.marketingEmails ?? false,
        promotionalSms: user.notifications?.promotionalSms ?? false
      },
      security: {
        twoFactorAuth: user.twoFactorAuth ?? false,
        loginAlerts: user.loginAlerts ?? true,
        sessionTimeout: user.sessionTimeout ?? 30
      }
    });
    
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { profile, notifications, security } = await req.json();

    await connectDB();
    
    const user = await User.findByIdAndUpdate(
      session.user.id,
      {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        language: profile.language,
        timezone: profile.timezone,
        notifications,
        twoFactorAuth: security.twoFactorAuth,
        loginAlerts: security.loginAlerts,
        sessionTimeout: security.sessionTimeout
      },
      { new: true }
    ).select("-password");
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true,
      message: "Settings updated successfully"
    });
    
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}