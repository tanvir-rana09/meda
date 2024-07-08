import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import passport from "passport";
import session from "express-session";
import User from "./models/userModel.js";
// import all routes
import {
    userRouter,
    noticeRoute,
    imageRouter,
    eventRouter,
    administratorRouter,
} from "./routes/index.js";
import cookieParser from "cookie-parser";
import "./config/passport.js"

// initialize express app
const app = express();

// middlewares
app.use(express.json());
app.use(cors({credentials:true}));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

// express session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET || "secret",
        resave: false,
        saveUninitialized: false,
    })
);

// passport middlewares
app.use(passport.initialize());
app.use(passport.session());

// passport serialize
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// passport de-serialize
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

// route middlewares
app.use("/api/v1/user", userRouter);
app.use("/api/v1/notice", noticeRoute);
app.use("/api/v1/image", imageRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/administrators", administratorRouter);

// custom error handling middleware (should be last)
app.use(errorHandler);

export default app;