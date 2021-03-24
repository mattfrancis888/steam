import { Router, Request, Response } from "express";
import {
    getUserProfile,
    editUserProfile,
    uploadImage,
    editImage,
    deleteImage,
} from "../controllers/profile";
const profileRouter = Router();
profileRouter.get("/get-profile", getUserProfile);
profileRouter.patch("/edit-profile", editUserProfile);
profileRouter.post("/upload-image", uploadImage);
profileRouter.put("/edit-image/:cloudinaryPublicId", editImage);
profileRouter.delete("/delete-image/:cloudinaryPublicId", deleteImage);
export default profileRouter;
