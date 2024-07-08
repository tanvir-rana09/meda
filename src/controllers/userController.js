import asyncHandler from "../utils/asyncHandler.js";
import apiSuccessResponse from "../utils/apiSuccessResponse.js";
import apiErrorResponse from "../utils/apiErrorResponse.js";
import User from "../models/userModel.js";
import { fileUploadonCloudinary } from "../middleware/Cloudinary.js";
import jwt from "jsonwebtoken";
import passport from "passport";
import bcrypt from "bcryptjs";

const signup = asyncHandler(async (req, res) => {
    try {
        const { email, password, name, username } = await req.body;

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
            profileUrl = profileUrl?.url || process.env.PROFILE;
        }

        const h = bcrypt.hashSync(password, 10);
        const newUser = await User.create({
            name,
            email,
            username,
            password: h,
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

const login = asyncHandler(async (req, res, next) => {
    try {
        passport.authenticate(
            "local",
            { session: false },
            (err, user, info) => {
                if (err || !user) {
                    return res
                        .status(400)
                        .json({ message: "invalid creadentials 2", user });
                }
                const token = jwt.sign(
                    { id: user._id },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );
                return res.json({ user, token });
            }
        )(req, res, next);
    } catch (error) {
        console.log(error);
    }
});

export { signup, login };
