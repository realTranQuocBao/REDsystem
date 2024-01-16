import { InferSchemaType, Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, required: false, default: false },
    isDisabled: { type: Boolean, required: false, default: false },
    deletedAt: { type: Date, default: null },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: true });

type User = InferSchemaType<typeof UserSchema>;

const UserModel = model<User>("User", UserSchema);

export default UserModel;