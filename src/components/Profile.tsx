import { Profiler } from "inspector";
import React, { useState, useEffect } from "react";
import defaultAvatar from "../img/defaultAvatar.png";
import EditProfileForm from "./EditProfileForm";
export interface EditProfileFormProps {
    onSubmit(formValues: any): void;
    initialValues?: any;
    dispatch?: any;
    postAdForm?: boolean;
    listingDetail?: any;
}

const Profile: React.FC<{}> = (props) => {
    const onSubmitEditProfile = (formValues: any) => {
        console.log(formValues);
    };

    return (
        <div className="profileContainer">
            <div className="profileHeader">
                <div className="profileHeaderAvatar">
                    <img src={defaultAvatar} alt="avatar" />
                </div>
                <h1>Usernameeeeeeeeeeeeeeeeeeeeeeeeeeee</h1>
            </div>
            <div className="profileTextAndFormWrap">
                <h1 className="profileAboutTitle">About</h1>
                <div className="profileTextWrap">
                    <p>
                        Set your profile name and avatar. This will help other
                        people identify you on the Steam Community.
                    </p>
                    <p>
                        Your profile name and avatar represent you throughout
                        Steam, and must be appropriate for all audiences.
                    </p>
                </div>
                <EditProfileForm onSubmit={onSubmitEditProfile} />
            </div>
        </div>
    );
};
export default Profile;
