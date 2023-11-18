import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    id: String,
    name: String,
    price: Number,
    quantity: String,
    description: String,
    image_path: String,
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
