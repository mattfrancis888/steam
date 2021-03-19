import { AuthUserAction, AuthErrorAction } from "../actions";

export enum ActionTypes {
    AUTH_USER,
    AUTH_ERROR,
    FETCH_GAMES,
    FETCH_GAMES_DISCOUNTED,
    FETCH_GAME_INFO,
    FETCH_GAME_INFO_REVIEWS,
    POST_REVIEW,
    EDIT_REVIEW,
    DELETE_REVIEW,
    GAME_ERROR,
}
export type AuthActions = AuthUserAction | AuthErrorAction;
