import { combineReducers } from "redux";
import { reducer as formReducer, FormStateMap } from "redux-form";

// import authReducer, { AuthStateResponse } from "./authReducer";
// import mediasReducer, { MediaStateResponse } from "./mediasReducer";
// import errorReducer, { ErrorStateResponse } from "./errorReducer";
// import mediaGenreAndCastReducer, {
//     MediaGenreAndCastStateResponse,
// } from "./mediaGenreAndCastReducer";
// import watchingReducer, { WatchingStateResponse } from "./watchingReducer";
// import searchReducer, { SearchStateResponse } from "./searchReducer";
export interface StoreState {
    // authStatus: AuthStateResponse;
    // medias: MediaStateResponse;
    // mediaGenreAndCast: MediaGenreAndCastStateResponse;
    // watching: WatchingStateResponse;
    // errors: ErrorStateResponse;
    // search: SearchStateResponse;
    // form: FormStateMap;
}
export default combineReducers<StoreState>({
    // authStatus: authReducer,
    // medias: mediasReducer,
    // watching: watchingReducer,
    // errors: errorReducer,
    // mediaGenreAndCast: mediaGenreAndCastReducer,
    // search: searchReducer,
    // form: formReducer,
});
