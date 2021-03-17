import { ActionTypes, ServerError, GamesErrorAction } from "../actions";
// import {
//     Media,
// } from "../actions";

export interface ErrorStateResponse {
    data?: ServerError;
}

const erorrReducer = (
    state: ErrorStateResponse = {},
    action: GamesErrorAction
) => {
    switch (action.type) {
        case ActionTypes.GAME_ERROR:
            return { ...state, data: action.payload };
        default:
            return state;
    }
};

export default erorrReducer;
