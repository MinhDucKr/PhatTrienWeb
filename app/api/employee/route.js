import connectMongoDB from "../../../libs/mongodb";
import Employee from "../../../models/employee";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { id, name, role, phone_number, address } = await request.json();
  await connectMongoDB();
  // Check if an employee with the given ID already exists
  const existingEmployee = await Employee.findOne({ id });

  if (existingEmployee) {
    return NextResponse.json(
      { message: "Mã nhân viên đã tồn tại!" },
      { status: 400 }
    );
  }
  await Employee.create({ id, name, role, phone_number, address });
  return NextResponse.json({ message: "Employee Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const employees = await Employee.find();
  return NextResponse.json({ employees });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Employee.findByIdAndDelete(id);
  return NextResponse.json({ message: "Employee deleted" }, { status: 200 });
}
