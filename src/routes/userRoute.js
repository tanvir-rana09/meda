import {Router} from "express"
import {signup} from "../controllers/userController.js"
import { upload } from "../middleware/Multer.js"
const router = Router()

router.route("/signup").post( upload.single("profile"), signup)


export default router