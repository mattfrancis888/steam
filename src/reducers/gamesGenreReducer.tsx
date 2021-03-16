import {
    ActionTypes,
    FetchGamesGenreAction,
    FetchGamesGenreResponse,
} from "../actions";

export interface GamesGenreStateResponse {
    data?: FetchGamesGenreResponse;
}

const gamesGenreReducer = (
    state: GamesGenreStateResponse = {},
    action: FetchGamesGenreAction
) => {
    switch (action.type) {
        case ActionTypes.FETCH_GAMES_GENRE:
            return { ...state, data: action.payload };
        default:
            return state;
    }
};

export default gamesGenreReducer;
