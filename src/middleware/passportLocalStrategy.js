import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/userModel.js";

passport.use(
    "local",
    new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
            try {
                // find user in db
                const user = await User.findOne({ email });
                if (!user)
                    return done(null, false, { message: "email not found" });

                // match password using bcrypt
                const userPassMatch = await user.comparePassword(password);
                if (!userPassMatch)
                    return done(null, false, {
                        message: "invalid credentials",
                    });

                return done(null, user);
            } catch (error) {
                done(error, false);
            }
        }
    )
);
