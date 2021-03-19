import { ActionTypes } from "./types";
import axios from "./axiosConfig";
import { Dispatch } from "redux";

import { SERVER_ERROR_MESSAGE } from "../constants";
import { GamesErrorAction } from "./games";

export interface FetchProfileAction {
    type: ActionTypes.FETCH_PROFILE;
    payload: FetchProfileResponse;
}

export interface Profile {
    username: string;
    avatar_url: string;
}
export interface FetchProfileResponse {
    profile: Profile[];
}

// export interface FetchProfileResponse {
//     username: string;
//     avatar_url: string;
// }

export const fetchProfile = () => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get<FetchProfileResponse>(`/api/profile`);
        dispatch<FetchProfileAction>({
            type: ActionTypes.FETCH_PROFILE,
            payload: response.data,
        });
    } catch (error) {
        dispatch<GamesErrorAction>({
            type: ActionTypes.GAME_ERROR,
            payload: { error: SERVER_ERROR_MESSAGE },
        });
    }
};
