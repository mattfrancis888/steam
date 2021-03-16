import { combineReducers } from "redux";
import { reducer as formReducer, FormStateMap } from "redux-form";

import authReducer, { AuthStateResponse } from "./authReducer";
import gamesBaseInfoReducer, {
    GamesBaseInfoStateResponse,
} from "./gamesBaseInfoReducer";
import gamesGenreReducer, {
    GamesGenreStateResponse,
} from "./gamesGenreReducer";
import gamesScreenshotReducer, {
    GamesScreenshotStateResponse,
} from "./gamesScreenshotReducer";
import errorReducer, { ErrorStateResponse } from "./errorReducer";

export interface StoreState {
    authStatus: AuthStateResponse;
    gamesBaseInfo: GamesBaseInfoStateResponse;
    gamesGenre: GamesGenreStateResponse;
    gamesScreenshot: GamesScreenshotStateResponse;
    errors: ErrorStateResponse;
    form: FormStateMap;
}
export default combineReducers<StoreState>({
    authStatus: authReducer,
    gamesBaseInfo: gamesBaseInfoReducer,
    gamesGenre: gamesGenreReducer,
    gamesScreenshot: gamesScreenshotReducer,
    errors: errorReducer,
    form: formReducer,
});
