// import connectMongoDB from "@/libs/mongodb";
// import Employee from "@/models/employee";
import Employee from "../../../../models/employee";
import connectMongoDB from "../../../../libs/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  console.log("🚀 ~ file: route.js:9 ~ PUT ~ id:", id);
  const { name, role, phone_number, address } = await request.json();
  await connectMongoDB();
  await Employee.findByIdAndUpdate(id, { name, role, phone_number, address });
  return NextResponse.json({ message: "Employee updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const employee = await Employee.findOne({ _id: id });
  return NextResponse.json({ employee }, { status: 200 });
}
