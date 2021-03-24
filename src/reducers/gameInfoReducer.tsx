import {
    ActionTypes,
    FetchGameInfoAction,
    FetchGameInfoResponse,
} from "../actions";

export interface GameInfoStateResponse {
    data?: FetchGameInfoResponse;
}

const GameInfoReducer = (
    state: GameInfoStateResponse = {},
    action: FetchGameInfoAction
) => {
    switch (action.type) {
        case ActionTypes.FETCH_GAME_INFO:
            return { ...state, data: action.payload };

        default:
            return state;
    }
};

export default GameInfoReducer;
