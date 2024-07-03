import { model, Schema } from "mongoose";

const administratorSchema = Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        trim: true,
        required: true,
    },
    role: {
        type: String,
    },
    image: {
        type: String,
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
    },
    number: String,
    education: String,
});

export default Administrators = model("Administrators", administratorSchema);
