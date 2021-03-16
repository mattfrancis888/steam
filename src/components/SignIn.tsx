import React from "react";
import history from "../browserHistory";
import SignInForm, { SignInFormValues } from "./SignInForm";

export interface SignInFormProps {
    onSubmit(formValues: any): void;
    authStatus?: string | null;
}

export interface SignInProps {
    signIn(formValues: any): void;
    authStatus?: string | null;
}

const SignIn: React.FC<{}> = () => {
    const onSubmitSignIn = async (formValues: SignInFormValues) => {
        // props.signIn(formValues);
    };

    return (
        <div className="signInContainer">
            <div className="signInSectionsWrap">
                <div className="signInFormSection">
                    <h1 className="signInTitle">Sign In</h1>
                    <SignInForm
                        onSubmit={(formValues: any) =>
                            onSubmitSignIn(formValues)
                        }
                    />
                </div>
                <div className="joinSection">
                    <p className="joinSteamText">
                        Join Steam and discover thousands of games to play.
                    </p>
                    <div className="joinImageWrap">
                        <img
                            className="joinImage"
                            src="https://store.akamai.steamstatic.com/public/shared/images/login/join_pc.png?v=1"
                            alt=""
                        />
                    </div>
                    <p>It's free and easy to use.</p>
                    <button className="joinSteamButton">Join Steam</button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
