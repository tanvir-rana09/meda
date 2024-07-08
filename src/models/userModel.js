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
    profile:{
        type:String
    }
});

// hash password using bcryptjs
userSchema.pre("save", async function(next)  {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
    next();
});

// compare hash password using bcryptjs
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};
 
const User = model("User", userSchema);
export default User
