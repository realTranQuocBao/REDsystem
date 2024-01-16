import { InferSchemaType, Schema, model } from "mongoose";

const CourseSchema = new Schema({
    name: { type: String, required: true },
    category: {
        type: String,
        default: 'Other!',
        enum: ['Programming', 'Design', 'Marketing', 'Business', 'Personal Development', 'Other!']
    },
    price: { type: Number, required: true },
    level: {
        type: String,
        default: 'Other!',
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Other!']
    },
    duration: { type: Number, default: null },  // Estimated duration in hours
    language: { type: String, default: null }, // Primary language of instruction
    instructor: { type: String, default: null },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

type Course = InferSchemaType<typeof CourseSchema>;

const CourseModel = model<Course>("Course", CourseSchema);

export default CourseModel;