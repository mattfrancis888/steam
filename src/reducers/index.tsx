import { combineReducers } from "redux";
import { reducer as formReducer, FormStateMap } from "redux-form";

import authReducer, { AuthStateResponse } from "./authReducer";
import gamesReducer, { GamesBaseInfoStateResponse } from "./gamesReducer";
import errorReducer, { ErrorStateResponse } from "./errorReducer";
// import mediaGenreAndCastReducer, {
//     MediaGenreAndCastStateResponse,
// } from "./mediaGenreAndCastReducer";
// import watchingReducer, { WatchingStateResponse } from "./watchingReducer";
// import searchReducer, { SearchStateResponse } from "./searchReducer";
export interface StoreState {
    authStatus: AuthStateResponse;
    gamesBaseInfo: GamesBaseInfoStateResponse;
    // mediaGenreAndCast: MediaGenreAndCastStateResponse;
    // watching: WatchingStateResponse;
    errors: ErrorStateResponse;
    // search: SearchStateResponse;
    form: FormStateMap;
}
export default combineReducers<StoreState>({
    authStatus: authReducer,
    gamesBaseInfo: gamesReducer,
    // watching: watchingReducer,
    errors: errorReducer,
    // mediaGenreAndCast: mediaGenreAndCastReducer,
    // search: searchReducer,
    form: formReducer,
});
