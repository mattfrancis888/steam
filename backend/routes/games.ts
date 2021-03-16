import { Router } from "express";
import {
    getGamesBaseInfo,
    getGamesScreenshots,
    getGamesGenres,
} from "../controllers/games";
const gameRouter = Router();

gameRouter.get("/games", getGamesBaseInfo);
gameRouter.get("/games-genre", getGamesGenres);
gameRouter.get("/games-screenshot", getGamesScreenshots);
// mediasRouter.get("/genre-cast/:mediaId", getMediaGenreAndCast);
// mediasRouter.get("/watching", getMediaWatchingByUser);
// mediasRouter.post("/add-to-watching/:mediaId", addToWatchingByUser);
// mediasRouter.delete("/remove-from-watching/:mediaId", removeFromWatchingByUser);
// mediasRouter.get("/search", getMediasBySearch);
export default gameRouter;