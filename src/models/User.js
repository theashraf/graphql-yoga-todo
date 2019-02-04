import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    todos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Todo"
      }
    ]
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export { User as default };
