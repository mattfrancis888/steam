import { ActionTypes, FetchGamesAction, FetchGamesResponse } from "../actions";

export interface GamesStateResponse {
    data?: FetchGamesResponse;
}

const gamesReducer = (
    state: GamesStateResponse = {},
    action: FetchGamesAction
) => {
    switch (action.type) {
        case ActionTypes.FETCH_GAMES:
            return { ...state, data: action.payload };

        default:
            return state;
    }
};

export default gamesReducer;
