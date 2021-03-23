import React from "react";
import history from "../browserHistory";
import SignInForm, { SignInFormValues } from "./SignInForm";
import { signIn } from "../actions";
import { StoreState } from "../reducers";
import { connect } from "react-redux";
import anime from "animejs/lib/anime.es.js";
import joinPc from "../img/joinPc.png";
export interface SignInFormProps {
    onSubmit(formValues: any): void;
    authStatus?: string | null;
}

export interface SignInProps {
    signIn(formValues: any): void;
    authStatus?: string | null;
}

const SignIn: React.FC<SignInProps> = (props) => {
    const onSubmitSignIn = async (formValues: SignInFormValues) => {
        props.signIn(formValues);
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
                            src={joinPc}
                            alt=""
                            onLoad={() => {
                                anime({
                                    targets: `.joinImage`,
                                    // Properties
                                    // Animation Parameters

                                    opacity: [
                                        {
                                            value: [0, 1],
                                            duration: 100,
                                            easing: "easeOutQuad",
                                        },
                                    ],
                                });
                            }}
                        />
                    </div>
                    <p>It's free and easy to use.</p>
                    <button
                        className="joinSteamButton"
                        onClick={() => {
                            history.push("/register");
                        }}
                    >
                        Join Steam
                    </button>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state: StoreState) => {
    return {
        authStatus: state.authStatus.authenticated,
    };
};

export default connect(mapStateToProps, { signIn })(SignIn);
