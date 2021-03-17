import { combineReducers } from "redux";
import { reducer as formReducer, FormStateMap } from "redux-form";

import authReducer, { AuthStateResponse } from "./authReducer";
import gamesBaseInfoReducer, { GamesStateResponse } from "./gamesReducer";
import discountedGamesReducer, {
    DiscountedGamesStateResponse,
} from "./discountedGamesReducer";
import errorReducer, { ErrorStateResponse } from "./errorReducer";

export interface StoreState {
    authStatus: AuthStateResponse;
    games: GamesStateResponse;
    discountedGames: DiscountedGamesStateResponse;
    errors: ErrorStateResponse;
    form: FormStateMap;
}
export default combineReducers<StoreState>({
    authStatus: authReducer,
    games: gamesBaseInfoReducer,
    discountedGames: discountedGamesReducer,
    errors: errorReducer,
    form: formReducer,
});
