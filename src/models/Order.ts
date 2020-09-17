import mongoose, { Schema, model } from "mongoose";
import MUUID from "uuid-mongodb";

export interface IOrder extends mongoose.Document {
  id: string;
  userId: string;
  details: string;
  subtotal: number;
  total: number;
}
const OrderSchema = new Schema({
  _id: {
    type: "object",
    value: { type: "Buffer" },
    default: () => MUUID.v1(),
  },
  userId: String,
  details: String,
  subtotal: Number,
  total: Number,
});

export default model<IOrder>("Order", OrderSchema);
