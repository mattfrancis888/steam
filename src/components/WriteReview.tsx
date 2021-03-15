import React, { ComponentType, useEffect } from "react";
import {
    Field,
    reduxForm,
    reset,
    change,
    FormErrors,
    InjectedFormProps,
} from "redux-form";
//compose is used to make it easier to "organize" mapStateToProps and redux form
import { StoreState } from "../reducers";
import { connect } from "react-redux";
import { RegisterFormProps } from "./GameInfo";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";

//Re-usable component
export interface EmailAndPasswordFormValues {
    review: string;
    recommendOrNot: string;
}

//Typescriptand redux form:
//https://levelup.gitconnected.com/react-js-typescript-redux-redux-form-jest-e522995ebe36

//Need to hoist render methods up or else it will give error where it will unfocus after first characther is typed
//https://stackoverflow.com/questions/39839051/using-redux-form-im-losing-focus-after-typing-the-first-character

const renderError = ({ error, touched }: any) => {
    if (touched && error) {
        //Touched (for input) will be false at first
        //When clicked and then clicked otuside of the input, it will be true
        return <div className="errorText">{error}</div>;
    }
};

const renderTextArea = ({ input, label, meta, placeHolder }: any) => {
    //"component" property automatically passes props to argument, it has {input properties and meta properties}
    //"label" automatically passes props to arguments
    return (
        <div>
            {/* <label>{label}</label> */}
            <textarea
                data-testid={label}
                className="createReviewTextArea"
                {...input}
                autoComplete="off"
            />
            {renderError(meta)}
        </div>
    );
    //{..input} is shortcut for redux-form; where you take all the input from "component's" props and pass it as
    //props to <input>
};

const RegisterForm: React.FC<
    RegisterFormProps & InjectedFormProps<{}, RegisterFormProps>
> = (props) => {
    const onSubmit = (formValues: any, dispatch: any) => {
        //onSubmit's default param is any
        //event.preventDefault() is automatically called with handleSubmit, a redux-form property
        //form values are the values from the fields that redux-form automatiacally passes
        //after clicking the submit button
        //dispatch(reset("registerForm"));
        props.onSubmit(formValues);

        //dispatch(change("registerForm", "password", ""));
    };

    return (
        <React.Fragment>
            <form
                className="reviewForm"
                data-testid="registerForm"
                onSubmit={props.handleSubmit(onSubmit)}
            >
                <div>
                    <div className="reviewFieldTitleWrap">
                        <h1 className="writeAReviewTitle">Write A Review</h1>
                        <p className="pleaseDescribe">
                            Please describe what you liked or disliked about
                            this game and whether you recommend it to others.
                        </p>
                    </div>
                    <div className="reviewTextAreaAndAvatarWrap">
                        <div className="reviewAvatar"></div>
                        <div className="reviewContentExceptAvatarWrap">
                            <div className="myReviewWrap">
                                <Field
                                    name="review"
                                    label="review"
                                    type="text"
                                    component={renderTextArea}
                                />
                            </div>
                            <div>
                                <div>
                                    <p>Do you recommend this game? </p>
                                    <div className="reviewButtonsWrap">
                                        <div className="recommendOrNotButtonsWrap">
                                            <button className="recommendOrNotButton">
                                                <FiThumbsUp />
                                                <p> Yes</p>
                                            </button>
                                            <button className="recommendOrNotButton">
                                                <FiThumbsDown />
                                                <p>No</p>
                                            </button>
                                        </div>
                                        <button className="postReviewButton">
                                            Post Review
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 className="authFormFieldTitleEmailInUse">
                        {props.authStatus}
                    </h3>
                </div>
            </form>
        </React.Fragment>
    );
};

const validate = (
    formValues: EmailAndPasswordFormValues
): FormErrors<EmailAndPasswordFormValues> => {
    //MUST BE NAMED VALIDATE! Other names would be ignored by reduxForm(..)
    const errors: FormErrors<EmailAndPasswordFormValues> = {};
    //If you return an empty object, redux form will assume everything is ok
    if (!formValues.review) {
        //user did not enter title, so undefined
        errors.review = "You must enter a review";
        //Must be the same name as field name! The "error" property in {meta} would receive this
    }
    if (!formValues.recommendOrNot) {
        errors.recommendOrNot = "You must pick";
    }

    return errors;
    //Erors is going to be passed to renderInput's meta
};

const mapStateToProps = (state: StoreState) => {
    return {
        //authStatus: state.authStatus.errorMessage,
    };
};

export default connect(mapStateToProps)(
    reduxForm<{}, RegisterFormProps>({
        form: "registerForm",
        validate,
    })(RegisterForm)
);
