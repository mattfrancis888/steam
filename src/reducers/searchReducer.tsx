import {
    ActionTypes,
    FetchGamesByKeywordAction,
    FetchGamesResponse,
} from "../actions";

export interface SearchStateResponse {
    data?: FetchGamesResponse;
}

const searchReducer = (
    state: SearchStateResponse = {},
    action: FetchGamesByKeywordAction
) => {
    switch (action.type) {
        case ActionTypes.FETCH_GAMES_BY_KEYWORD:
            return { ...state, data: action.payload };

        default:
            return state;
    }
};

export default searchReducer;
