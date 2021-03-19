import { ActionTypes } from "./types";
import axios from "./axiosConfig";
import { Dispatch } from "redux";

import { SERVER_ERROR_MESSAGE } from "../constants";
import { GamesErrorAction } from "./games";

export interface FetchProfileAction {
    type: ActionTypes.FETCH_PROFILE;
    payload: ProfileResponse;
}

export interface EditProfileAction {
    type: ActionTypes.EDIT_PROFILE;
    payload: ProfileResponse;
}

export interface Profile {
    username: string;
    avatar_url: string;
}
export interface ProfileResponse {
    profile: Profile[];
}

export interface CloudinaryImagePath {
    cloudinaryImagePath: string;
}
export interface CloudinaryImageDelete {
    result: string;
}

export const fetchProfile = () => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get<ProfileResponse>(`/api/profile`);
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

export const editProfile = (
    formValues: any,
    cloudinaryPublicId: string | null,
    existingCloudinaryImagePath: string | null
) => async (dispatch: Dispatch) => {
    //Distributed transaction takes place here, if an error occurs in uploading to one of the storage systems,
    // we haven't handle it (i.e an image may be uploaded, but the data failed to be inserted; the image wouldn't be deleted)

    //Form data is used to POST a file (image in our case)
    //https://stackoverflow.com/questions/43013858/how-to-post-a-file-from-a-form-with-axios
    try {
        let cloudinaryImagePath = {};

        if (
            formValues.image instanceof FileList &&
            cloudinaryPublicId != null
        ) {
            //A cloudinary image already exists, ovveride current cloudinary image
            let formData = new FormData();
            formData.append("image", formValues.image[0]);
            //overrides current image with the current publicid
            const imagePathResponse = await axios.put<CloudinaryImagePath>(
                `/api/edit-image/${cloudinaryPublicId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            cloudinaryImagePath = imagePathResponse.data;
        } else if (
            formValues.image instanceof FileList &&
            cloudinaryPublicId === null
        ) {
            //cloudinary image does not exist because user did not create a listing with an image or
            //has removed an image in their lisitng

            let formData = new FormData();
            formData.append("image", formValues.image[0]);

            const imagePathResponse = await axios.post<CloudinaryImagePath>(
                "/api/upload-image",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            cloudinaryImagePath = imagePathResponse.data;
        } else if (
            existingCloudinaryImagePath &&
            Object.keys(cloudinaryImagePath).length === 0
        ) {
            cloudinaryImagePath = {
                cloudinaryImagePath: existingCloudinaryImagePath,
            };
        } else if (formValues.image === null) {
            //User wants to remove image
            await axios.delete<CloudinaryImageDelete>(
                `/api/delete-image/${cloudinaryPublicId}`
            );
        }

        const response = await axios.patch<ProfileResponse>(
            `/api/edit-profile`,
            {
                ...cloudinaryImagePath,
                ...formValues,
            }
        );

        dispatch<EditProfileAction>({
            type: ActionTypes.EDIT_PROFILE,
            payload: response.data,
        });
        alert("Success! Profile is updated.");
    } catch (error) {
        console.log("error", error);
        alert(SERVER_ERROR_MESSAGE);
        dispatch<GamesErrorAction>({
            type: ActionTypes.GAME_ERROR,
            payload: { error: SERVER_ERROR_MESSAGE },
        });
    }
};
