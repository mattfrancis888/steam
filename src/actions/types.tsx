import { AuthUserAction, AuthErrorAction } from "../actions";

export enum ActionTypes {
    AUTH_USER,
    AUTH_ERROR,
    FETCH_GAMES,
    FETCH_GAMES_DISCOUNTED,
    FETCH_GAME_INFO,
    GAME_ERROR,
}
export type AuthActions = AuthUserAction | AuthErrorAction;
