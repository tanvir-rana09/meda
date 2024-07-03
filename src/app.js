import express, { urlencoded } from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import passport from "passport";
import session from "express-session";
import User from "./models/userModel.js"

// import all routes
import {
    userRouter,
    noticeRoute,
    imageRouter,
    eventRouter,
    administratorRouter,
} from "./routes/index.js";
import session from "express-session";
import cookieParser from "cookie-parser";

// intialize express app
const app = express();

// middlewares
app.use(cors({ credentials: true }));
app.use("/", (req, res) => {
    res.send("hello");
});
app.use(cookieParser());
app.use({ extended: true, limit: "20kb" });
app.use(express.json());
app.use(urlencoded({ extended: true, limit: "20kb" }));


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
app.use(errorHandler());

// passport serialize
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  

// passport de-serialize
passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

// route middleware
app.use("/api/v1/user", userRouter);
app.use("/api/v1/notce", noticeRoute);
app.use("/api/v1/image", imageRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/administrators", administratorRouter);

export default app;
