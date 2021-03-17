import {
    ActionTypes,
    FetchDiscountedGamesAction,
    FetchGamesResponse,
} from "../actions";

export interface DiscountedGamesStateResponse {
    data?: FetchGamesResponse;
}

const gamesReducer = (
    state: DiscountedGamesStateResponse = {},
    action: FetchDiscountedGamesAction
) => {
    switch (action.type) {
        case ActionTypes.FETCH_GAMES_DISCOUNTED:
            return { ...state, data: action.payload };

        default:
            return state;
    }
};

export default gamesReducer;
