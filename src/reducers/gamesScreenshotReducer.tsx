import {
    ActionTypes,
    FetchGamesScreenshotAction,
    FetchGamesScreenshotResponse,
} from "../actions";

export interface GamesScreenshotStateResponse {
    data?: FetchGamesScreenshotResponse;
}

const gamesScreenshotReducer = (
    state: GamesScreenshotStateResponse = {},
    action: FetchGamesScreenshotAction
) => {
    switch (action.type) {
        case ActionTypes.FETCH_GAMES_SCREENSHOT:
            return { ...state, data: action.payload };
        default:
            return state;
    }
};

export default gamesScreenshotReducer;
