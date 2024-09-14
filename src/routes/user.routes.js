import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { checkUserDocuments } from "../middlewares/checkUserDocuments.middlegare.js";
import { upload } from "../utils/uploadFiles.js";
import { userModel } from "../persistences/mongo/models/user.model.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

router.post("/email/reset-password", userController.sendEmailResetPassword);
router.post("/reset-password", userController.resetPassword);
router.get("/premium/:uid", passportCall("jwt"), authorization(["user", "premium"]), userController.changeUserRole);
router.post(
    "/:uid/documents",
    passportCall("jwt"),
    authorization(["user", "premium"]),
    upload.fields([
        { name: "profile", maxCount: 1 },
        { name: "documents", maxCount: 3 },
        { name: "imgProducts", maxCount: 3 },
    ]),
    userController.addDocuments
);

export default router;
