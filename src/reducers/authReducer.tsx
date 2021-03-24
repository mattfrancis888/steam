import { ActionTypes, AuthActions } from "../actions";

export interface AuthStateResponse {
    authenticated?: string | null;
    errorMessage?: string;
}

export const AUTH_STATE: AuthStateResponse = {
    authenticated: "",
    errorMessage: "",
};
const authReducer = (
    state: AuthStateResponse = AUTH_STATE,
    action: AuthActions
) => {
    switch (action.type) {
        case ActionTypes.AUTH_USER:
            return {
                ...state,
                authenticated: action.payload.token,
                errorMessage: "",
            };
        case ActionTypes.AUTH_ERROR:
            return {
                ...state,
                authenticated: "",
                errorMessage: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
