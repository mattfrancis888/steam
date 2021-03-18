import { Router } from "express";
import {
    getGames,
    getGamesTest,
    getDiscountedGames,
    getGameInfo,
    getGameInfoTest,
} from "../controllers/games";
const gameRouter = Router();

gameRouter.get("/games", getGames);
gameRouter.get("/games-discounted", getDiscountedGames);
// gameRouter.get("/game-info/:gameId", getGameInfo);
gameRouter.get("/game-info/:gameId", getGameInfoTest);
gameRouter.get("/games-test", getGamesTest);
// mediasRouter.post("/add-to-watching/:mediaId", addToWatchingByUser);
// mediasRouter.delete("/remove-from-watching/:mediaId", removeFromWatchingByUser);
// mediasRouter.get("/search", getMediasBySearch);
export default gameRouter;
