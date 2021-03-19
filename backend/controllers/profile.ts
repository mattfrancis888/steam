import { Request, Response, NextFunction, response } from "express";
import pool from "../databasePool";
import { FORBIDDEN_STATUS, INTERNAL_SERVER_ERROR_STATUS } from "../constants";
import jwt_decode from "jwt-decode";
import { decode } from "jsonwebtoken";

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
