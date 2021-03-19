import {
    ActionTypes,
    FetchProfileAction,
    EditProfileAction,
    ProfileResponse,
} from "../actions";

export interface ProfileStateResponse {
    data?: ProfileResponse;
}

const ProfileReducer = (
    state: ProfileStateResponse = {},
    action: FetchProfileAction | EditProfileAction
) => {
    switch (action.type) {
        case ActionTypes.FETCH_PROFILE:
            return { ...state, data: action.payload };
        case ActionTypes.EDIT_PROFILE:
            return { ...state, data: action.payload };

        default:
            return state;
    }
};

export default ProfileReducer;
