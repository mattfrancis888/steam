import { Router } from "express";
import {
    getGames,
    getGamesTest,
    getDiscountedGames,
    getGameInfo,
    getGameInfoTest,
    getReviews,
    postReview,
    editReview,
    deleteReview,
    getGamesBySearch,
} from "../controllers/games";
const gameRouter = Router();

gameRouter.get("/games", getGames);
gameRouter.get("/games-discounted", getDiscountedGames);
gameRouter.get("/search", getGamesBySearch);
// gameRouter.get("/game-info/:gameId", getGameInfoTest);
gameRouter.get("/game-info/:gameId", getGameInfo);
gameRouter.get("/reviews/:gameId", getReviews);
gameRouter.post("/review/:gameId", postReview, getReviews);
gameRouter.get("/games-test", getGamesTest);
gameRouter.patch("/edit/:gameId", editReview, getReviews);
gameRouter.delete("/delete/:gameId", deleteReview, getReviews);
// mediasRouter.post("/add-to-watching/:mediaId", addToWatchingByUser);
// mediasRouter.delete("/remove-from-watching/:mediaId", removeFromWatchingByUser);
// mediasRouter.get("/search", getMediasBySearch);
export default gameRouter;
