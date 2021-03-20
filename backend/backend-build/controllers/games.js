"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.editReview = exports.postReview = exports.getReviews = exports.getGameInfo = exports.getDiscountedGames = exports.getGames = exports.getGameInfoTest = exports.getGamesTest = void 0;
var databasePool_1 = __importDefault(require("../databasePool"));
var constants_1 = require("../constants");
var jwt_decode_1 = __importDefault(require("jwt-decode"));
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
var getGamesTest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response_1, genreResponse, results, genresByGames_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, databasePool_1.default.query("select * from game NATURAL join game_price ORDER BY game_id")];
            case 1:
                response_1 = _a.sent();
                return [4 /*yield*/, databasePool_1.default.query("select * from lookup_game_genre NATURAL JOIN genre ORDER BY game_id")];
            case 2:
                genreResponse = _a.sent();
                results = {};
                genresByGames_1 = genreResponse.rows.reduce(function (acc, row) {
                    var _a;
                    // console.log(acc, row);
                    //acc represents accumulator
                    //acc is the object we are starting with, r is the object we have built so far
                    return __assign(__assign({}, acc), (_a = {}, _a[row.game_id] = __spreadArray(__spreadArray([], (typeof acc[row.game_id] === "undefined"
                        ? []
                        : //If the accumulator already has defined [row.game_id]
                            acc[row.game_id])), [
                        //We are using property name as a number,
                        //So we have to use bracket notation
                        //Add current row to empty array or existing acc[row.game_id]
                        row,
                    ]), _a));
                }, {});
                //console.log(genresByGames) outputs:
                //{
                //   '1': [
                //   { genre_id: 1, game_id: 1, genre_type: 'Action' },
                //      { genre_id: 2, game_id: 1, genre_type: 'Fantasy' }
                //       ],
                //     '2': [ { genre_id: 1, game_id: 2, genre_type: 'Action' } ]
                // }
                results = response_1.rows.map(function (row) { return (__assign(__assign({}, row), { genres: typeof genresByGames_1[row.game_id] !== "undefined"
                        ? genresByGames_1[row.game_id]
                        : [] })); });
                res.send({ games: results });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, res.sendStatus(constants_1.INTERNAL_SERVER_ERROR_STATUS)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getGamesTest = getGamesTest;
var getGameInfoTest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var gameId, sql, response_2, sql2, reviewersResponse, reviewers_1, results, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                gameId = req.params.gameId;
                sql = "SELECT ga.game_id, ga.title, ga.cover_url, ga.release_date,\n        ga.about, g.genres, sc.screenshots, gp.price, gp.discount_percentage, gp.price_after_discount\n        FROM game ga\n            JOIN (\n              select lg.game_id, ARRAY_AGG(gr.genre_type) as genres\n              from lookup_game_genre lg \n                  JOIN genre gr on gr.genre_id = lg.genre_id\n              group by lg.game_id\n           ) g on g.game_id = ga.game_id\n            JOIN ( \n              select ls.game_id, ARRAY_AGG(s.screenshot_url) as screenshots\n              from lookup_game_screenshot ls \n                join screenshot s on s.screenshot_id = ls.screenshot_id\n              group by ls.game_id\n           ) sc on sc.game_id = ga.game_id\n           INNER JOIN game_price gp on ga.price_id = gp.price_id \n           WHERE ga.game_id = $1 ;";
                return [4 /*yield*/, databasePool_1.default.query(sql, [gameId])];
            case 1:
                response_2 = _a.sent();
                sql2 = " select lr.game_id, ui.username, ui.avatar_url,\n         r.recommend, r.opinion\n        from lookup_game_review lr \n          join review r on lr.review_id = r.review_id\n         join user_info ui on lr.user_id = ui.user_id ";
                return [4 /*yield*/, databasePool_1.default.query(sql2)];
            case 2:
                reviewersResponse = _a.sent();
                reviewers_1 = reviewersResponse.rows.reduce(function (acc, row) {
                    var _a;
                    // console.log(acc, row);
                    return __assign(__assign({}, acc), (_a = {}, _a[row.game_id] = __spreadArray(__spreadArray([], (typeof acc[row.game_id] === "undefined"
                        ? []
                        : //If the accumulator already has defined [row.game_id]
                            acc[row.game_id])), [
                        row,
                    ]), _a));
                }, {});
                results = response_2.rows.map(function (row) { return (__assign(__assign({}, row), { reviews: typeof reviewers_1[row.game_id] !== "undefined"
                        ? reviewers_1[row.game_id]
                        : [] })); });
                // res.send(results);
                res.send({ games: results });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, res.sendStatus(constants_1.INTERNAL_SERVER_ERROR_STATUS)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getGameInfoTest = getGameInfoTest;
//Option 2: Array_AGG
var getGames = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, response_3, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                sql = "SELECT ga.game_id, ga.title, ga.cover_url, ga.release_date,\n        ga.about, g.genres, sc.screenshots, gp.price, gp.discount_percentage, gp.price_after_discount\n        FROM game ga\n            JOIN (\n              select lg.game_id, ARRAY_AGG(gr.genre_type) as genres\n              from lookup_game_genre lg \n                  JOIN genre gr on gr.genre_id = lg.genre_id\n              group by lg.game_id\n           ) g on g.game_id = ga.game_id\n            JOIN ( \n              select ls.game_id, ARRAY_AGG(s.screenshot_url) as screenshots\n              from lookup_game_screenshot ls \n                join screenshot s on s.screenshot_id = ls.screenshot_id\n              group by ls.game_id\n           ) sc on sc.game_id = ga.game_id\n           INNER JOIN game_price gp on ga.price_id = gp.price_id ;";
                return [4 /*yield*/, databasePool_1.default.query(sql)];
            case 1:
                response_3 = _a.sent();
                res.send({ games: response_3.rows });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                return [2 /*return*/, res.sendStatus(constants_1.INTERNAL_SERVER_ERROR_STATUS)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getGames = getGames;
var getDiscountedGames = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, response_4, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                sql = "SELECT ga.game_id, ga.title, ga.cover_url, ga.release_date,\n        ga.about, g.genres, sc.screenshots, gp.price, gp.discount_percentage, gp.price_after_discount\n        FROM game ga\n            JOIN (\n              select lg.game_id, ARRAY_AGG(gr.genre_type) as genres\n              from lookup_game_genre lg \n                  JOIN genre gr on gr.genre_id = lg.genre_id\n              group by lg.game_id\n           ) g on g.game_id = ga.game_id\n            JOIN ( \n              select ls.game_id, ARRAY_AGG(s.screenshot_url) as screenshots\n              from lookup_game_screenshot ls \n                join screenshot s on s.screenshot_id = ls.screenshot_id\n              group by ls.game_id\n           ) sc on sc.game_id = ga.game_id\n           INNER JOIN game_price gp on ga.price_id = gp.price_id \n           WHERE gp.discount_percentage  > 0 ;";
                return [4 /*yield*/, databasePool_1.default.query(sql)];
            case 1:
                response_4 = _a.sent();
                res.send({ games: response_4.rows });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                return [2 /*return*/, res.sendStatus(constants_1.INTERNAL_SERVER_ERROR_STATUS)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getDiscountedGames = getDiscountedGames;
var getGameInfo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var gameId, sql, response_5, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                gameId = req.params.gameId;
                sql = "SELECT ga.game_id, ga.title, ga.cover_url, ga.release_date,\n        ga.about, g.genres, sc.screenshots, gp.price, gp.discount_percentage, gp.price_after_discount\n        FROM game ga\n            JOIN (\n              select lg.game_id, ARRAY_AGG(gr.genre_type) as genres\n              from lookup_game_genre lg \n                  JOIN genre gr on gr.genre_id = lg.genre_id\n              group by lg.game_id\n           ) g on g.game_id = ga.game_id\n            JOIN ( \n              select ls.game_id, ARRAY_AGG(s.screenshot_url) as screenshots\n              from lookup_game_screenshot ls \n                join screenshot s on s.screenshot_id = ls.screenshot_id\n              group by ls.game_id\n           ) sc on sc.game_id = ga.game_id\n           INNER JOIN game_price gp on ga.price_id = gp.price_id \n           WHERE ga.game_id = $1 ;";
                return [4 /*yield*/, databasePool_1.default.query(sql, [gameId])];
            case 1:
                response_5 = _a.sent();
                res.send({ games: response_5.rows });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                return [2 /*return*/, res.sendStatus(constants_1.INTERNAL_SERVER_ERROR_STATUS)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getGameInfo = getGameInfo;
var getReviews = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, reviewersResponse, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                sql = "   select ui.username, ui.email, ui.avatar_url,\n        r.recommend, r.opinion\n       from lookup_game_review lr \n         join review r on lr.review_id = r.review_id\n        full outer join user_info ui on lr.user_id = ui.user_id\n        WHERE lr.game_id = $1 ORDER BY r.review_id DESC; ";
                return [4 /*yield*/, databasePool_1.default.query(sql, [req.params.gameId])];
            case 1:
                reviewersResponse = _a.sent();
                res.send({ reviews: reviewersResponse.rows });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                return [2 /*return*/, res.sendStatus(constants_1.INTERNAL_SERVER_ERROR_STATUS)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getReviews = getReviews;
var postReview = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var decodedJwt, email, gameId, recommend, opinion, reviewResponse, reviewId, userInfoResponse, userId, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                decodedJwt = null;
                if (req.cookies.ACCESS_TOKEN)
                    decodedJwt = jwt_decode_1.default(req.cookies.ACCESS_TOKEN);
                email = null;
                //@ts-ignore
                if (decodedJwt)
                    email = decodedJwt.subject;
                gameId = req.params.gameId;
                recommend = req.body.recommend;
                opinion = req.body.opinion;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, , 10]);
                //Transaction
                return [4 /*yield*/, databasePool_1.default.query("BEGIN")];
            case 2:
                //Transaction
                _a.sent();
                return [4 /*yield*/, databasePool_1.default.query("INSERT INTO review(recommend, opinion) VALUES($1, $2) RETURNING review_id", [recommend, opinion])];
            case 3:
                reviewResponse = _a.sent();
                reviewId = reviewResponse.rows[0].review_id;
                if (!email) return [3 /*break*/, 6];
                return [4 /*yield*/, databasePool_1.default.query("SELECT user_id from user_info WHERE email = $1", [email])];
            case 4:
                userInfoResponse = _a.sent();
                userId = userInfoResponse.rows[0].user_id;
                return [4 /*yield*/, databasePool_1.default.query("INSERT INTO lookup_game_review(game_id, review_id, user_id)\n                VALUES($1, $2, $3)", [gameId, reviewId, userId])];
            case 5:
                _a.sent();
                return [3 /*break*/, 8];
            case 6: 
            //User is not signed it
            return [4 /*yield*/, databasePool_1.default.query("INSERT INTO lookup_game_review(game_id, review_id, user_id)\n                VALUES($1, $2, $3)", [gameId, reviewId, null])];
            case 7:
                //User is not signed it
                _a.sent();
                _a.label = 8;
            case 8:
                databasePool_1.default.query("COMMIT");
                next();
                return [3 /*break*/, 10];
            case 9:
                error_7 = _a.sent();
                databasePool_1.default.query("ROLLBACK");
                console.log("ROLLBACK TRIGGERED", error_7);
                return [2 /*return*/, res.sendStatus(constants_1.INTERNAL_SERVER_ERROR_STATUS)];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.postReview = postReview;
var editReview = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var decodedJwt, email, gameId, recommend, opinion, response_6, reviewId, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                decodedJwt = jwt_decode_1.default(req.cookies.ACCESS_TOKEN);
                email = decodedJwt.subject;
                gameId = req.params.gameId;
                recommend = req.body.recommend;
                opinion = req.body.opinion;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                //Transaction
                return [4 /*yield*/, databasePool_1.default.query("BEGIN")];
            case 2:
                //Transaction
                _a.sent();
                return [4 /*yield*/, databasePool_1.default.query("select lg.review_id from lookup_game_review lg \n            INNER JOIN user_info ui on lg.user_id = ui.user_id\n             WHERE ui.email = $1 AND lg.game_id = $2 ", [email, gameId])];
            case 3:
                response_6 = _a.sent();
                reviewId = response_6.rows[0].review_id;
                return [4 /*yield*/, databasePool_1.default.query("UPDATE review SET recommend = $1, opinion = $2  WHERE\n            review_id = $3", [recommend, opinion, reviewId])];
            case 4:
                _a.sent();
                databasePool_1.default.query("COMMIT");
                next();
                return [3 /*break*/, 6];
            case 5:
                error_8 = _a.sent();
                databasePool_1.default.query("ROLLBACK");
                console.log("ROLLBACK TRIGGERED", error_8);
                return [2 /*return*/, res.sendStatus(constants_1.INTERNAL_SERVER_ERROR_STATUS)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.editReview = editReview;
var deleteReview = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var decodedJwt, email, gameId, response_7, reviewId, userId, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                decodedJwt = jwt_decode_1.default(req.cookies.ACCESS_TOKEN);
                email = decodedJwt.subject;
                gameId = req.params.gameId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                //Transaction
                return [4 /*yield*/, databasePool_1.default.query("BEGIN")];
            case 2:
                //Transaction
                _a.sent();
                return [4 /*yield*/, databasePool_1.default.query("select ui.user_id, lg.review_id from lookup_game_review lg \n            INNER JOIN user_info ui on lg.user_id = ui.user_id\n             WHERE ui.email = $1 AND lg.game_id = $2 ", [email, gameId])];
            case 3:
                response_7 = _a.sent();
                reviewId = response_7.rows[0].review_id;
                userId = response_7.rows[0].user_id;
                return [4 /*yield*/, databasePool_1.default.query("DELETE FROM lookup_game_review \n             WHERE game_id = $1 AND\n            user_id = $2\n            AND review_id = $3", [gameId, userId, reviewId])];
            case 4:
                _a.sent();
                return [4 /*yield*/, databasePool_1.default.query("DELETE FROM review where review_id = $1 ", [
                        reviewId,
                    ])];
            case 5:
                _a.sent();
                databasePool_1.default.query("COMMIT");
                next();
                return [3 /*break*/, 7];
            case 6:
                error_9 = _a.sent();
                databasePool_1.default.query("ROLLBACK");
                console.log("ROLLBACK TRIGGERED", error_9);
                return [2 /*return*/, res.sendStatus(constants_1.INTERNAL_SERVER_ERROR_STATUS)];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.deleteReview = deleteReview;
