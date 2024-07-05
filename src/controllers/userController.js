import asyncHandler from "../utils/asyncHandler.js";
import apiSuccessResponse from "../utils/apiSuccessResponse.js";
import apiErrorResponse from "../utils/apiErrorResponse.js";
import User from "../models/userModel.js";
import { fileUploadonCloudinary } from "../middleware/Cloudinary.js";
import bcrypt from "bcryptjs";

const options = {
    httpsOnly: true,
    secure: true,
    sameSite: "None",
};

const signup = asyncHandler(async (req, res) => {
    try {
        const { email, password, name, username } = req.body;

        // check all field that no one is empty
        if (
            [email, username, name, password].find((field) => {
                field === "";
            })
        ) {
            throw new apiErrorResponse(400, "All field is required");
        }

        const user = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (user) {
            throw new apiErrorResponse(409, "This user already exists");
        }

        let profileUrl;
        if (req.file && req.file?.path) {

            profileUrl = await fileUploadonCloudinary(req.file?.path);
            profileUrl = profileUrl?.url || process.env.PROFILE
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(profileUrl);
        const newUser = await User.create({
            name,
            email,
            username,
            password: hashedPassword,
            profile: profileUrl,
        });

        if (!newUser) {
            throw new apiErrorResponse(
                500,
                "internal server error to create new user"
            );
        }

        return res
            .status(201)
            .json(
                new apiSuccessResponse(
                    201,
                    "User created successfully",
                    newUser
                )
            );
    } catch (error) {
        console.log(error);
    }
});

const login = asyncHandler(async () => {});

export { signup };
