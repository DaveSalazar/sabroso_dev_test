import mongoose, { Schema, model } from "mongoose";
import MUUID from "uuid-mongodb";

export interface IProduct extends mongoose.Document {
  id: string;
  name: string;
  description: string;
  price: number;
}
const productSchema = new Schema({
  _id: {
    type: "object",
    value: { type: "Buffer" },
    default: () => MUUID.v1(),
  },
  name: String,
  description: String,
  price: Number,
});

export default model<IProduct>("Product", productSchema);
