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
import { WriteReviewFormProps } from "./GameInfo";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import defaultAvatar from "../img/defaultAvatar.png";
//Re-usable component
export interface WriteReviewFormValues {
    opinion: string;
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

const WriteReview: React.FC<
    WriteReviewFormProps & InjectedFormProps<{}, WriteReviewFormProps>
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
                <div className="reviewSectionsWrap">
                    <div className="reviewFieldTitleWrap">
                        <h1 className="writeAReviewTitle">
                            {`Write A Review ${
                                !props.authStatus
                                    ? `(as anonymous; sign-in to remove anonymity)`
                                    : ``
                            }`}
                        </h1>
                        <p className="pleaseDescribe">
                            Please describe what you liked or disliked about
                            this game and whether you recommend it to others.
                        </p>
                    </div>

                    {/* <div className="reviewAvatar">
                            <img src={defaultAvatar} alt="avatar"></img>
                        </div> */}
                    <div className="reviewContentExceptAvatarWrap">
                        <div className="myReviewWrap">
                            <Field
                                name="opinion"
                                label="opinion"
                                type="text"
                                component={renderTextArea}
                            />
                        </div>
                        <div>
                            <div className="reviewButtonsSection">
                                <p className="doYouRecommend">
                                    Do you recommend this game?{" "}
                                </p>
                                <div className="reviewButtonsWrap">
                                    <div className="recommendOrNotButtonsWrap">
                                        {/* https://stackoverflow.com/questions/41590766/redux-form-always-validates-even-on-a-normal-button-press */}
                                        {/* By adding type="button" the button will not be a "submit" button */}
                                        <button
                                            className={`recommendOrNotButton ${
                                                props.recommend
                                                    ? `recommendOrNotButtonClicked`
                                                    : ``
                                            }`}
                                            type="button"
                                            onClick={() =>
                                                props.onRecommendorNot(true)
                                            }
                                        >
                                            <FiThumbsUp />
                                            <p> Yes</p>
                                        </button>
                                        <button
                                            className={`recommendOrNotButton ${
                                                !props.recommend
                                                    ? `recommendOrNotButtonClicked`
                                                    : ``
                                            }`}
                                            type="button"
                                            onClick={() =>
                                                props.onRecommendorNot(false)
                                            }
                                        >
                                            <FiThumbsDown />
                                            <p>No</p>
                                        </button>
                                    </div>
                                    <button
                                        className="postReviewButton"
                                        data-testid="postReviewButton"
                                    >
                                        Post Review
                                    </button>
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
    formValues: WriteReviewFormValues
): FormErrors<WriteReviewFormValues> => {
    //MUST BE NAMED VALIDATE! Other names would be ignored by reduxForm(..)
    const errors: FormErrors<WriteReviewFormValues> = {};
    //If you return an empty object, redux form will assume everything is ok
    if (!formValues.opinion) {
        //user did not enter title, so undefined
        errors.opinion = "You must enter a review";
        //Must be the same name as field name! The "error" property in {meta} would receive this
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
    reduxForm<{}, WriteReviewFormProps>({
        form: "writeReview",
        validate,
    })(WriteReview)
);
