"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var games_1 = require("../controllers/games");
var gameRouter = express_1.Router();
gameRouter.get("/games", games_1.getGames);
gameRouter.get("/games-discounted", games_1.getDiscountedGames);
// gameRouter.get("/game-info/:gameId", getGameInfo);
gameRouter.get("/game-info/:gameId", games_1.getGameInfoTest);
gameRouter.get("/games-test", games_1.getGamesTest);
// mediasRouter.post("/add-to-watching/:mediaId", addToWatchingByUser);
// mediasRouter.delete("/remove-from-watching/:mediaId", removeFromWatchingByUser);
// mediasRouter.get("/search", getMediasBySearch);
exports.default = gameRouter;
