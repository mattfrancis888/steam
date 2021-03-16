import { AuthUserAction, AuthErrorAction } from "../actions";

export enum ActionTypes {
    AUTH_USER,
    AUTH_ERROR,
}
export type AuthActions = AuthUserAction | AuthErrorAction;
