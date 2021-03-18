import { Router } from "express";
import {
    getGamesBaseInfo,
    getDiscountedGames,
    getGameInfo,
} from "../controllers/games";
const gameRouter = Router();

gameRouter.get("/games", getGamesBaseInfo);
gameRouter.get("/games-discounted", getDiscountedGames);
gameRouter.get("/game-info/:gameId", getGameInfo);
// mediasRouter.get("/watching", getMediaWatchingByUser);
// mediasRouter.post("/add-to-watching/:mediaId", addToWatchingByUser);
// mediasRouter.delete("/remove-from-watching/:mediaId", removeFromWatchingByUser);
// mediasRouter.get("/search", getMediasBySearch);
export default gameRouter;
