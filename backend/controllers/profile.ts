import { Request, Response, NextFunction, response } from "express";
import pool from "../databasePool";
import { FORBIDDEN_STATUS, INTERNAL_SERVER_ERROR_STATUS } from "../constants";
import jwt_decode from "jwt-decode";
import { decode } from "jsonwebtoken";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const decodedJwt = jwt_decode(req.cookies.ACCESS_TOKEN);
        //@ts-ignore
        const email = decodedJwt.subject;

        const userInfoResponse = await pool.query(
            `SELECT username, avatar_url from user_info WHERE email = $1`,
            [email]
        );

        res.send({ profile: userInfoResponse.rows });
    } catch (error) {
        console.log(error);
        return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
    }
};

//Guide on uploading image with cloudinary and multer
//https:medium.com/@lola.omolambe/image-upload-using-cloudinary-node-and-mongoose-2f6f0723c745
var cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_secret,
});

export const uploadImage = async (req: any, res: Response) => {
    //Unable ot use async await with upload()
    //Wants 3 arguments
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: "steam/profile",
            format: async (req, file) => "jpg",
        },
    });
    const multerUploader = multer({ storage });
    const upload = multerUploader.single("image");

    upload(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
            return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
            // A Multer error occurred when uploading.
        } else if (err) {
            // An unknown error occurred when uploading.
            return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
        }
        return res.send({ cloudinaryImagePath: req.file.path });

        // Everything went fine and save document in DB here.
    });
};

export const editImage = async (req: any, res: Response) => {
    console.log("publicId", req.params.cloudinaryPublicId);
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: "steam/profile",
            format: async (req, file) => "jpg",
            public_id: (req, file) => req.params.cloudinaryPublicId,
        },
    });
    const multerUploader = multer({ storage });
    const upload = multerUploader.single("image");
    //Unable ot use async await with upload()
    //Wants 3 arguments
    upload(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
            console.log(err);
            return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
            // A Multer error occurred when uploading.
        } else if (err) {
            console.log(err);
            // An unknown error occurred when uploading.
            return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
        }
        return res.send({ cloudinaryImagePath: req.file.path });

        // Everything went fine and save document in DB here.
    });
};

export const deleteImage = async (req: any, res: Response) => {
    cloudinary.uploader.destroy(
        // req.params.cloudinaryPublicId,
        `steam/profile/${req.params.cloudinaryPublicId}`,
        (err: any, result: any) => {
            if (err) return console.log(err);
            console.log(req.params.cloudinaryPublicId, " deleted");
            res.send(result);
        }
    );
};

export const editUserProfile = async (req: Request, res: Response) => {
    try {
        const username = req.body.username;
        const avatarUrl = req.body.cloudinaryImagePath;
        const decodedJwt = jwt_decode(req.cookies.ACCESS_TOKEN);
        //@ts-ignore
        const email = decodedJwt.subject;

        const userInfoResponse = await pool.query(
            `UPDATE user_info SET username = $1, avatar_url = $2
             WHERE email = $3 RETURNING username, avatar_url`,
            [username, avatarUrl, email]
        );

        res.send({ profile: userInfoResponse.rows });
    } catch (error) {
        console.log(error);
        return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
    }
};
