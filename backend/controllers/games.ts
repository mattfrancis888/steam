import { Request, Response, NextFunction, response } from "express";
import pool from "../databasePool";
import { FORBIDDEN_STATUS, INTERNAL_SERVER_ERROR_STATUS } from "../constants";
import _ from "lodash";
import jwt_decode from "jwt-decode";

interface Games {
    reviews?: any;
    genres?: any;
    screenshots?: any;
    games?: any;
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

// Check Reddit's saved post 'Combining results from different SQL tables' to get a clearer detail, but...
// Option 1: 'Injecting it in node' after a SELECT * Query
export const getGamesTest = async (req: Request, res: Response) => {
    try {
        const response = await pool.query(
            `select * from game NATURAL join game_price ORDER BY game_id`
        );

        const genreResponse = await pool.query(
            `select * from lookup_game_genre NATURAL JOIN genre ORDER BY game_id`
        );

        // const test = { 10: {} };
        // let obj1 = { hi: "bye" };
        // let obj2 = { matt: "cool" };
        // test[10] = [obj1, obj2];

        let results: any = {};

        // This will make an Object where each key is game_id and value are the genres for that game
        let genresByGames = genreResponse.rows.reduce((acc, row) => {
            // console.log(acc, row);
            //acc represents accumulator
            //acc is the object we are starting with, r is the object we have built so far
            return {
                ...acc,
                //first iteration example:
                //turn {} { genre_id: 1, game_id: 1, genre_type: 'Action' }
                //into: { '1': [ { genre_id: 1, game_id: 1, genre_type: 'Action' } ] }

                //What we are trying to essentially achieve below:
                // const test = { 10: {} };
                // let obj1 = { hi: "bye" };
                // let obj2 = { matt: "cool" };
                // test[10] = [obj1, obj2];
                [row.game_id]: [
                    //If the accumulator has no previusley defined [row.game_id]
                    ...(typeof acc[row.game_id] === "undefined"
                        ? []
                        : //If the accumulator already has defined [row.game_id]
                          acc[row.game_id]),
                    //We are using property name as a number,
                    //So we have to use bracket notation
                    //Add current row to empty array or existing acc[row.game_id]
                    row,
                ],
            };
        }, {}); //Start with Empty Object

        //console.log(genresByGames) outputs:
        //{
        //   '1': [
        //   { genre_id: 1, game_id: 1, genre_type: 'Action' },
        //      { genre_id: 2, game_id: 1, genre_type: 'Fantasy' }
        //       ],
        //     '2': [ { genre_id: 1, game_id: 2, genre_type: 'Action' } ]
        // }

        results = response.rows.map((row) => ({
            ...row,
            genres:
                typeof genresByGames[row.game_id] !== "undefined"
                    ? genresByGames[row.game_id]
                    : [],
        }));

        res.send({ games: results });
        // res.send({...response.rows})
    } catch (error) {
        console.log(error);
        return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
    }
};

export const getGameInfoTest = async (req: Request, res: Response) => {
    try {
        let gameId = req.params.gameId;

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
           INNER JOIN game_price gp on ga.price_id = gp.price_id 
           WHERE ga.game_id = $1 ;`;
        //Transaction

        const response = await pool.query(sql, [gameId]);
        let sql2 = ` select lr.game_id, ui.username, ui.avatar_url,
         r.recommend, r.opinion
        from lookup_game_review lr 
          join review r on lr.review_id = r.review_id
         join user_info ui on lr.user_id = ui.user_id `;

        const reviewersResponse = await pool.query(sql2);
        let reviewers = reviewersResponse.rows.reduce((acc, row) => {
            // console.log(acc, row);
            return {
                ...acc,
                [row.game_id]: [
                    //If the accumulator has no previusley defined [row.game_id]
                    ...(typeof acc[row.game_id] === "undefined"
                        ? []
                        : //If the accumulator already has defined [row.game_id]
                          acc[row.game_id]),

                    row,
                ],
            };
        }, {});

        let results = response.rows.map((row) => ({
            ...row,
            reviews:
                typeof reviewers[row.game_id] !== "undefined"
                    ? reviewers[row.game_id]
                    : [],
        }));

        // res.send(results);
        res.send({ games: results });
    } catch (error) {
        return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
    }
};

//Option 2: Array_AGG

export const getGames = async (req: Request, res: Response) => {
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
           INNER JOIN game_price gp on ga.price_id = gp.price_id 
           WHERE gp.discount_percentage IS NOT NULL ;`;

        const response = await pool.query(sql);

        res.send({ games: response.rows });
        // res.send({...response.rows})
    } catch (error) {
        return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
    }
};

export const getGameInfo = async (req: Request, res: Response) => {
    try {
        let gameId = req.params.gameId;

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
           INNER JOIN game_price gp on ga.price_id = gp.price_id 
           WHERE ga.game_id = $1 ;`;
        //Transaction

        const response = await pool.query(sql, [gameId]);

        res.send({ games: response.rows });
        // res.send({...response.rows})
    } catch (error) {
        return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
    }
};

export const getReviews = async (req: any, res: Response) => {
    try {
        let sql = ` select ui.username, ui.avatar_url,
         r.recommend, r.opinion
        from lookup_game_review lr 
          join review r on lr.review_id = r.review_id
         join user_info ui on lr.user_id = ui.user_id
         WHERE lr.game_id = $1 `;

        const reviewersResponse = await pool.query(sql, [req.params.gameId]);
        res.send({ reviews: reviewersResponse.rows });
    } catch (error) {
        return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
    }
};

// export const postReview = async (req: any, res: Response) => {
//     const decodedJwt = jwt_decode(req.cookies.ACCESS_TOKEN);
//     //@ts-ignore
//     const email = decodedJwt.subject;
//     const gameId = req.params.gameId;
//     const recommend = req.body.recommend;
//     const opinion = req.body.opinion;
//     try {
//         //Transaction
//         await pool.query("BEGIN");
//         //Insert if it does not exist on table

//         const reviewResponse = await pool.query(
//             `INSERT INTO review(recommend, opinion) VALUES($1, $2)`,
//             [recommend, opinion]
//         );
//         console.log(reviewResponse.rows[0].review_id);

//         const userInfoResponse = await pool.query(
//             `SELECT user_id from user_info WHERE email = $1`,
//             [email]
//         );
//         console.log(userInfoResponse.rows[0].user_id);
//         await pool.query(
//             `INSERT INTO lookup_game_review(game_id, review_id, user_id)
//             VALUES($1, $2, $3)`,
//             [
//                 gameId,
//                 reviewResponse.rows[0].review_id,
//                 userInfoResponse.rows[0].user_id,
//             ]
//         );

//         pool.query("COMMIT");
//         res.send({ watching: response.rows });
//     } catch (error) {
//         pool.query("ROLLBACK");
//         console.log("ROLLBACK TRIGGERED", error);
//         return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
//     }
// };
