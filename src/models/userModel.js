import bcrypt from "bcryptjs";
import { model, Schema } from "mongoose";

const userSchema = Schema({
    username: {
        type: String,
        unique: true,
        toLowerCase: true,
        trim: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    role: {
        type: Boolean,
    },
});

// hash password using bcryptjs
userSchema.pre("save", async (next) => {
    if (this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// compare hash password using bcryptjs
userSchema.methods.comparePassword = (passport) => {
    return bcrypt.compare(passport, this.passport);
};

export default User = model("User", userSchema);
