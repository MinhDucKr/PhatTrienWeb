import connectMongoDB from "../../../libs/mongodb";
import Product from "../../../models/product";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { id, name, price, description, quantity } = await request.json();
  await connectMongoDB();
  const existingProduct = await Product.findOne({ id });

  if (existingProduct) {
    return NextResponse.json(
      { message: "Sản phẩm đã tồn tại!" },
      { status: 400 }
    );
  }
  await Product.create({ id, name, price, description, quantity });
  return NextResponse.json({ message: "Product Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const product = await Product.find();
  return NextResponse.json({ product });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Product deleted" }, { status: 200 });
}
