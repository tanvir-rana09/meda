import { Router } from "express";
import { signup } from "../controllers/userController.js";
import passport from "passport";
const router = Router();

router.route("/signup").post(signup);
// router.route("/login").post((req, res, next) => {
//     passport.authenticate("local", { session: false }, (err, user, info) => {
//         console.log(user);
//         if (err || !user) {
//             return res
//                 .status(400)
//                 .json({ message: "invalid creadentials 2", user });
//         }
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//             expiresIn: "1h",
//         });
//         return res.json({ user, token }); 
//     })(req, res, next); 
// });

export default router;
