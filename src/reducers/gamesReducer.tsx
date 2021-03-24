import {
    ActionTypes,
    FetchGamesAction,
    FetchGamesByKeywordAction,
    FetchGamesResponse,
} from "../actions";

export interface GamesStateResponse {
    data?: FetchGamesResponse;
}

const gamesReducer = (
    state: GamesStateResponse = {},
    action: FetchGamesAction | FetchGamesByKeywordAction
) => {
    switch (action.type) {
        case ActionTypes.FETCH_GAMES:
            return { ...state, data: action.payload };
        case ActionTypes.FETCH_GAMES_BY_KEYWORD:
            return { ...state, data: action.payload };

        default:
            return state;
    }
};

export default gamesReducer;
