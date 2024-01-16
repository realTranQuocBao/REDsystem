import { InferSchemaType, Schema, model } from "mongoose";

const ResetPasswordSchema = new Schema({
    email: { type: String, required: true, unique: true },
}, { timestamps: true });
type ResetPassword = InferSchemaType<typeof ResetPasswordSchema>;

const ResetPasswordModel = model<ResetPassword>("ResetPassword", ResetPasswordSchema);

export default ResetPasswordModel;