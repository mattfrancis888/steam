import {
    ActionTypes,
    FetchProfileAction,
    FetchProfileResponse,
} from "../actions";

export interface ProfileStateResponse {
    data?: FetchProfileResponse;
}

const ProfileReducer = (
    state: ProfileStateResponse = {},
    action: FetchProfileAction
) => {
    switch (action.type) {
        case ActionTypes.FETCH_PROFILE:
            return { ...state, data: action.payload };

        default:
            return state;
    }
};

export default ProfileReducer;
