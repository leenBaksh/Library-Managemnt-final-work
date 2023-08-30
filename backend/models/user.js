import { model, Schema } from "mongoose";

const UserModel = model(
  "users",
  new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        required: true },
  })
)

export default { UserModel }