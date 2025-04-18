import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        name: { type: String, require: true },
        email: { type: String, require: true },
        password: { type: String, require: true },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        address: {
            steet: { type: String },
            city: { type: String },
            zip: { type: String },
            country: { type: String }
        },
        isVerified: { type: Boolean, default: false },
        resetToken: { type: String },
        resetTokenExpires: { type: Date },
        favorites: [{type: Schema.Types.ObjectId, ref: 'Product'}]
    },
    {
        timestamps: true
    }
);

export const User = models.User || model('User', UserSchema);