import { Profiler } from "inspector";
import React, { useState, useEffect } from "react";
import defaultAvatar from "../img/defaultAvatar.png";
import EditProfileForm from "./EditProfileForm";
import { fetchProfile } from "../actions";
import { connect } from "react-redux";
import Loading from "./Loading";
import { StoreState } from "../reducers";
import { ProfileStateResponse } from "../reducers/profileReducer";
import { ErrorStateResponse } from "../reducers/errorReducer";

export interface EditProfileFormProps {
    onSubmit(formValues: any): void;
    initialValues?: any;
    dispatch?: any;
    postAdForm?: boolean;
    listingDetail?: any;
    cloudinaryImage: string;
}

export interface ProfileProps {
    fetchProfile(): void;
    profile: ProfileStateResponse;
    errors: ErrorStateResponse;
}

const Profile: React.FC<ProfileProps> = (props) => {
    const onSubmitEditProfile = (formValues: any) => {
        console.log(formValues);
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
})(Profile);
