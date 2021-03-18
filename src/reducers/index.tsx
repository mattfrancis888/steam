import { combineReducers } from "redux";
import { reducer as formReducer, FormStateMap } from "redux-form";

import authReducer, { AuthStateResponse } from "./authReducer";
import gamesBaseInfoReducer, { GamesStateResponse } from "./gamesReducer";
import discountedGamesReducer, {
    DiscountedGamesStateResponse,
} from "./discountedGamesReducer";
import gameInfoReducer, { GameInfoStateResponse } from "./gameInfoReducer";
import errorReducer, { ErrorStateResponse } from "./errorReducer";
import gameInfoReviewsReducer, {
    GameInfoReviewsStateResponse,
} from "./gameInfoReviewsReducer";

export interface StoreState {
    authStatus: AuthStateResponse;
    games: GamesStateResponse;
    discountedGames: DiscountedGamesStateResponse;
    gameInfo: GameInfoStateResponse;
    gameInfoReviews: GameInfoReviewsStateResponse;
    errors: ErrorStateResponse;
    form: FormStateMap;
}
export default combineReducers<StoreState>({
    authStatus: authReducer,
    games: gamesBaseInfoReducer,
    discountedGames: discountedGamesReducer,
    gameInfo: gameInfoReducer,
    gameInfoReviews: gameInfoReviewsReducer,
    errors: errorReducer,
    form: formReducer,
});
