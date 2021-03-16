import { AuthUserAction, AuthErrorAction } from "../actions";

export enum ActionTypes {
    AUTH_USER,
    AUTH_ERROR,
    FETCH_GAMES_BASE_INFO,
    FETCH_GAMES_GENRE,
    GAME_ERROR,
}
export type AuthActions = AuthUserAction | AuthErrorAction;
