import {
    ActionTypes,
    FetchGameInfoReviewsAction,
    FetchGameInfoReviewsResponse,
} from "../actions";

export interface GameInfoReviewsStateResponse {
    data?: FetchGameInfoReviewsResponse;
}

const gameInfoReviewsReducer = (
    state: GameInfoReviewsStateResponse = {},
    action: FetchGameInfoReviewsAction
) => {
    switch (action.type) {
        case ActionTypes.FETCH_GAME_INFO_REVIEWS:
            return { ...state, data: action.payload };

        default:
            return state;
    }
};

export default gameInfoReviewsReducer;
