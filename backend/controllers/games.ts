import { Request, Response, NextFunction, response } from "express";
import pool from "../databasePool";
import { FORBIDDEN_STATUS, INTERNAL_SERVER_ERROR_STATUS } from "../constants";
import _ from "lodash";
import jwt_decode from "jwt-decode";

interface Games {
    base_info?: any;
    genres?: any;
    screenshots?: any;
}

//Thre are 2 ways to turn handle;
// {
//     "games": {
//         "base_info": [
//             {

//                 "game_id": 1,
//                 "title": "Monsters Inc Game"
//             },
//            {

//                 "game_id": 2,
//                 "title": "Dora Game"
//             },
//         ],
//         "genres": [
//             {
//                 "genre_id": 1,
//                 "game_id": 1,
//                 "genre_type": "Action"
//             },
//             {
//                 "genre_id": 2,
//                 "game_id": 2,
//                 "genre_type": "Fantasy"
//             }
//         ],
// }
//TO:
// {
//     "games": {
//             {

//                 "game_id": 1,
//                 "title": "Monsters Inc Game"
//                 "genres": [
//                     {
//                          "genre_id": 1,
//                           "game_id": 1,
//                           "genre_type": "Action"
//                      }....
//                  ]
//             {
//             {

//                 "game_id": 2,
//                 "title": "Dora"
//                 "genres": [
//                     {
//                          "genre_id": 2,
//                           "game_id": 2,
//                           "genre_type": "Action"
//                      },
//                  ]
//             {

//            ....
//         ],

// }

//Check Reddit's saved post to get a clearer detail, but...
//Option 1: 'Injecting it in node' after a SELECT * Query
// export const getGamesBaseInfo = async (req: Request, res: Response) => {
//     try {
//         const response = await pool.query(
//             `select * from game NATURAL join game_price ORDER BY game_id`
//         );

//         const genreResponse = await pool.query(
//             `select * from lookup_game_genre NATURAL JOIN genre ORDER BY game_id`
//         );

//         let results: Games = {};

//         // results.base_info = response.rows;
//         // results.genres = genreResponse.rows;
//         // results.screenshots = screenshotResponse.rows;
//         // This will make an Object where each key is game_id and value are the genres for that game
//         let genresByGames = genreResponse.rows.reduce((acc, r) => {
//             console.log(acc, r);
//             return {
//                 ...acc,
//                 [r.game_id]: [
//                     ...(typeof acc[r.game_id] === "undefined"
//                         ? []
//                         : acc[r.game_id]),
//                     r,
//                 ],
//             };
//         }, {}); //Start with Empty Object
//         results.base_info = response.rows.map((row) => ({
//             ...row,
//             genres:
//                 typeof genresByGames[row.game_id] !== "undefined"
//                     ? genresByGames[row.game_id]
//                     : [],
//         }));

//         res.send({ games: results });
//         // res.send({...response.rows})
//     } catch (error) {
//         return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
//     }
// };

//Option 2: Array_AGG

export const getGamesBaseInfo = async (req: Request, res: Response) => {
    try {
        //With Inner Joins AND DISTINCT; slower performance
        // let sql = `SELECT a.title,
        // ARRAY_AGG( DISTINCT c.genre_type) AS genre,
        // ARRAY_AGG( DISTINCT e.screenshot_url) AS screenshot
        // FROM game a INNER JOIN lookup_game_genre b ON a.game_id = b.game_id
        // INNER JOIN genre c ON b.genre_id = c.genre_id
        // INNER JOIN lookup_game_screenshot d ON a.game_id =d.game_id
        // INNER JOIN screenshot e ON d.screenshot_id = e.screenshot_id
        // GROUP BY a.title`;

        //With Natrual Joins
        // let sql = ` SELECT a.title, ARRAY_AGG(DISTINCT c.genre_type) AS genre, ARRAY_AGG(DISTINCT e.screenshot_url) AS screenshot
        // FROM game a NATURAL JOIN lookup_game_genre b NATURAL JOIN genre c
        // NATURAL JOIN lookup_game_screenshot d NATURAL JOIN screenshot e
        // GROUP BY a.title`;

        //With Inner JOINS without DISTINCT: Best performance:
        //Source: https://www.reddit.com/r/SQL/comments/m716xz/newbie_using_array_agg_outputs_repeated_values/gr97ju7/?context=3
        // let sql = `SELECT ga.title, g.genres, sc.screenshots, gp.price, gp.discount_percentage, gp.price_after_discount
        // FROM game ga
        //     JOIN (
        //       select lg.game_id, ARRAY_AGG(gr.genre_type) as genres
        //       from lookup_game_genre lg
        //           JOIN genre gr on gr.genre_id = lg.genre_id
        //       group by lg.game_id
        //    ) g on g.game_id = ga.game_id
        //     JOIN (
        //       select ls.game_id, ARRAY_AGG(s.screenshot_url) as screenshots
        //       from lookup_game_screenshot ls
        //         join screenshot s on s.screenshot_id = ls.screenshot_id
        //       group by ls.game_id
        //    ) sc on sc.game_id = ga.game_id
        //    INNER JOIN game_price gp on ga.price_id = gp.price_id ;`;

        let sql = `SELECT ga.game_id, ga.title, ga.cover_url, ga.release_date,
        ga.about, g.genres, sc.screenshots, gp.price, gp.discount_percentage, gp.price_after_discount
        FROM game ga
            JOIN (
              select lg.game_id, ARRAY_AGG(gr.genre_type) as genres
              from lookup_game_genre lg 
                  JOIN genre gr on gr.genre_id = lg.genre_id
              group by lg.game_id
           ) g on g.game_id = ga.game_id
            JOIN ( 
              select ls.game_id, ARRAY_AGG(s.screenshot_url) as screenshots
              from lookup_game_screenshot ls 
                join screenshot s on s.screenshot_id = ls.screenshot_id
              group by ls.game_id
           ) sc on sc.game_id = ga.game_id
           INNER JOIN game_price gp on ga.price_id = gp.price_id ;`;

        const response = await pool.query(sql);

        res.send({ games: response.rows });
        // res.send({...response.rows})
    } catch (error) {
        return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
    }
};

export const getDiscountedGames = async (req: Request, res: Response) => {
    try {
        const response = await pool.query(
            `SELECT * FROM game NATURAL join game_price
            WHERE discount_percentage IS NOT NULL ORDER BY game_id`
        );

        res.send({ games: response.rows });
        // res.send({...response.rows})
    } catch (error) {
        return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
    }
};
