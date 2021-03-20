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
import profileReducer, { ProfileStateResponse } from "./profileReducer";
import searchReducer, { SearchStateResponse } from "./searchReducer";
export interface StoreState {
    authStatus: AuthStateResponse;
    games: GamesStateResponse;
    discountedGames: DiscountedGamesStateResponse;
    // search: SearchStateResponse;
    gameInfo: GameInfoStateResponse;
    gameInfoReviews: GameInfoReviewsStateResponse;
    profile: ProfileStateResponse;
    errors: ErrorStateResponse;
    form: FormStateMap;
}
export default combineReducers<StoreState>({
    authStatus: authReducer,
    games: gamesBaseInfoReducer,
    discountedGames: discountedGamesReducer,
    // search: searchReducer,
    gameInfo: gameInfoReducer,
    gameInfoReviews: gameInfoReviewsReducer,
    profile: profileReducer,
    errors: errorReducer,
    form: formReducer,
});
