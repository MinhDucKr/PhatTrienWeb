import Product from "../../../../models/product";
import connectMongoDB from "../../../../libs/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { name, price, quantity, description, image_path } =
    await request.json();
  await connectMongoDB();
  await Product.findByIdAndUpdate(id, {
    name,
    price,
    quantity,
    description,
    image_path,
  });
  return NextResponse.json({ message: "Product updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const product = await Product.findOne({ _id: id });
  return NextResponse.json({ product }, { status: 200 });
}
