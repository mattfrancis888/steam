import {
    ActionTypes,
    EditReviewAction,
    FetchGameInfoReviewsAction,
    ReviewsResponse,
    PostReviewAction,
    DeleteReviewAction,
} from "../actions";

export interface GameInfoReviewsStateResponse {
    data?: ReviewsResponse;
}

const gameInfoReviewsReducer = (
    state: GameInfoReviewsStateResponse = {},
    action:
        | FetchGameInfoReviewsAction
        | PostReviewAction
        | EditReviewAction
        | DeleteReviewAction
) => {
    switch (action.type) {
        case ActionTypes.FETCH_GAME_INFO_REVIEWS:
            return { ...state, data: action.payload };
        case ActionTypes.POST_REVIEW:
            return { ...state, data: action.payload };
        case ActionTypes.EDIT_REVIEW:
            return { ...state, data: action.payload };
        case ActionTypes.DELETE_REVIEW:
            return { ...state, data: action.payload };

        default:
            return state;
    }
};

export default gameInfoReviewsReducer;
