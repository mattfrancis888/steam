import { Request, Response, NextFunction, response } from "express";
import pool from "../databasePool";
import { FORBIDDEN_STATUS, INTERNAL_SERVER_ERROR_STATUS } from "../constants";
import _ from "lodash";
import jwt_decode from "jwt-decode";

export const getGamesBaseInfo = async (req: Request, res: Response) => {
    try {
        await pool.query("BEGIN");
        const response = await pool.query(
            `select * from game NATURAL join game_price ORDER BY game_id`
        );

        res.send({ games: response.rows });
        // res.send({...response.rows})
    } catch (error) {
        return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
    }
};

export const getGamesGenres = async (req: Request, res: Response) => {
    try {
        const response = await pool.query(
            `select * from lookup_game_genre NATURAL JOIN genre ORDER BY game_id`
        );
        res.send({ games: response.rows });
        // res.send({...response.rows})
    } catch (error) {
        return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
    }
};

export const getGamesScreenshots = async (req: Request, res: Response) => {
    try {
        const response = await pool.query(
            `select * from lookup_game_screenshot NATURAL JOIN screenshot ORDER BY game_id`
        );

        res.send({ games: response.rows });
        // res.send({...response.rows})
    } catch (error) {
        return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
    }
};
