import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
  {
    id: String,
    name: String,
    role: String,
    phone_number: String,
    address: String,
  },
  {
    timestamps: true,
  }
);

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;
