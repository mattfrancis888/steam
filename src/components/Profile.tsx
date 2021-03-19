import { Profiler } from "inspector";
import React, { useState, useEffect } from "react";
import defaultAvatar from "../img/defaultAvatar.png";
import EditProfileForm from "./EditProfileForm";
import { fetchProfile, editProfile } from "../actions";
import { connect } from "react-redux";
import Loading from "./Loading";
import { StoreState } from "../reducers";
import { ProfileStateResponse } from "../reducers/profileReducer";
import { ErrorStateResponse } from "../reducers/errorReducer";

export interface EditProfileFormProps {
    onSubmit(formValues: any): void;
    initialValues?: any;
    dispatch?: any;
    listingDetail?: any;
    cloudinaryImage: string;
}

export interface ProfileProps {
    fetchProfile(): void;
    editProfile(
        formValues: any,
        cloudinaryPublicId: string | null,
        existingCloudinaryImagePath: string | null
    ): void;
    profile: ProfileStateResponse;
    errors: ErrorStateResponse;
}

const Profile: React.FC<ProfileProps> = (props) => {
    const onSubmitEditProfile = (formValues: any) => {
        console.log(formValues);
        if (props.profile.data?.profile[0].avatar_url) {
            let cloudinaryPaths = props.profile.data?.profile[0].avatar_url.split(
                "/"
            );
            let cloudinaryLastPath = cloudinaryPaths.pop();
            //@ts-ignore
            let cloudinaryPublicId = cloudinaryLastPath.split(".")[0];

            if (formValues.image) {
                //Replace existing picture with new picture
                props.editProfile(formValues, cloudinaryPublicId, null);
            } else {
                if (formValues.imagePreview === null) {
                    //user removed picture.
                    //Replace existing picture with nothing

                    props.editProfile(formValues, cloudinaryPublicId, null);
                } else {
                    //If user has an existing image already, but they did not modify  <input type="file"/>
                    //formValue.image will be empty. So we are going to prevent the user from
                    //updating an the list with an empty image by using the cloudinary image link
                    props.editProfile(
                        formValues,
                        cloudinaryPublicId,
                        props.profile.data?.profile[0].avatar_url
                    );
                }
            }
        } else {
            //If listing does not have initial cloudinary image link (because they made a listing without a picture beforehand
            //or they removed their picture and want to edit their listing picture again)
            //Upload cloudinary image

            props.editProfile(formValues, null, null);
        }
    };

    useEffect(() => {
        props.fetchProfile();
    }, []);

    const renderContent = () => {
        if (props.errors.data?.error) {
            return (
                <div className="serverErrorContainer">
                    <h3 className="serverErrorText">
                        {props.errors.data?.error}
                    </h3>
                </div>
            );
        } else if (props.profile.data) {
            const { username, avatar_url } = props.profile.data.profile[0];
            return (
                <div className="profileContainer">
                    <div className="profileHeader">
                        <div className="profileHeaderAvatar">
                            <img
                                src={avatar_url ? avatar_url : defaultAvatar}
                                onError={(e: any) => {
                                    e.target.src = defaultAvatar; // some replacement image
                                }}
                                alt="avatar"
                            />
                        </div>
                        <h1>{username}</h1>
                    </div>
                    <div className="profileTextAndFormWrap">
                        <h1 className="profileAboutTitle">About</h1>
                        <div className="profileTextWrap">
                            <p>
                                Set your profile name and avatar. This will help
                                other people identify you on the Steam
                                Community.
                            </p>
                            <p>
                                Your profile name and avatar represent you
                                throughout Steam, and must be appropriate for
                                all audiences.
                            </p>
                        </div>
                        <EditProfileForm
                            onSubmit={onSubmitEditProfile}
                            cloudinaryImage={avatar_url}
                            initialValues={{
                                username: username,
                            }}
                        />
                    </div>
                </div>
            );
        } else {
            return <Loading />;
        }
    };
    return <React.Fragment>{renderContent()}</React.Fragment>;
};

const mapStateToProps = (state: StoreState) => {
    return {
        profile: state.profile,
        errors: state.errors,
    };
};

export default connect(mapStateToProps, {
    fetchProfile,
    editProfile,
})(Profile);
