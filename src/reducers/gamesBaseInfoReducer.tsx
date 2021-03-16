import {
    ActionTypes,
    FetchGamesBaseInfoAction,
    FetchGamesBaseInfoResponse,
} from "../actions";

export interface GamesBaseInfoStateResponse {
    data?: FetchGamesBaseInfoResponse;
}

const gamesBaseInfoReducer = (
    state: GamesBaseInfoStateResponse = {},
    action: FetchGamesBaseInfoAction
) => {
    switch (action.type) {
        case ActionTypes.FETCH_GAMES_BASE_INFO:
            return { ...state, data: action.payload };
        default:
            return state;
    }
};

export default gamesBaseInfoReducer;
