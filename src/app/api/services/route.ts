import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import Service from "@/lib/db/models/Service";

export async function GET() {
  try {
    await connectDB();
    
    const services = await Service.find({ isActive: true })
      .select('name description duration price isActive')
      .lean();
    
    console.log(`Found ${services.length} services`);
    
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}