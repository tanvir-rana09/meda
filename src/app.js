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

// intialize express app
const app = express();

// middlewares
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

// express session middleware
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
    })
);

//passport middleware
app.use(passport.authenticate("session"));
app.use(passport.session());
app.use(passport.initialize());

// coustom error handle middleware
app.use(errorHandler);

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

// route middleware
app.use("/api/v1/user", userRouter);
app.use("/api/v1/notice", noticeRoute);
app.use("/api/v1/image", imageRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/administrators", administratorRouter);

export default app;
