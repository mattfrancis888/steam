import React, { ComponentType, useEffect } from "react";
import { Field, reduxForm, FormErrors, InjectedFormProps } from "redux-form";
//compose is used to make it easier to "organize" mapStateToProps and redux form
import { StoreState } from "../reducers";
import { connect } from "react-redux";

import { SignInFormProps } from "./SignIn";
//Re-usable component
export interface SignInFormValues {
    email: string;
    password: string;
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

const renderTextInput = ({ input, label, meta, placeholder }: any) => {
    //"component" property automatically passes props to argument, it has {input properties and meta properties}
    //"label" automatically passes props to arguments

    return (
        <div>
            {/* <label>{input.placeHolder}</label> */}
            <input
                className="signInTextInput"
                data-testid={label}
                placeholder={placeholder}
                {...input}
                autoComplete="off"
            />
            {renderError(meta)}
        </div>
    );
    //{..input} is shortcut for redux-form; where you take all the input from "component's" props and pass it as
    //props to <input>
};

const renderPasswordInput = ({ input, label, meta, placeholder }: any) => {
    return (
        <div>
            {/* <label>{label}</label> */}
            <input
                className="signInTextInput"
                data-testid={label}
                placeholder={placeholder}
                type="password"
                {...input}
                autoComplete="off"
            />
            {renderError(meta)}
        </div>
    );
};

const SignInForm: React.FC<
    SignInFormProps & InjectedFormProps<{}, SignInFormProps>
> = (props) => {
    const onSubmit = (formValues: any, dispatch: any) => {
        props.onSubmit(formValues);
        // dispatch(change("signInForm", "password", ""));
    };

    return (
        <React.Fragment>
            <form
                className="signInForm"
                data-testid="signInForm"
                onSubmit={props.handleSubmit(onSubmit)}
            >
                <div className="authFieldSection">
                    <div className="signInFormFieldTitleWrap">
                        <h1>Email</h1>
                        <h3 className="authFormFieldTitleEmailInUse">
                            {props.authStatus}
                        </h3>
                    </div>
                    <Field
                        name="email"
                        label="email"
                        type="text"
                        component={renderTextInput}
                        placeholder="Email"
                    />
                </div>
                <div className="authFieldSection">
                    <div className="signInFormFieldTitleWrap">
                        <h1>Password</h1>
                        <h3 className="authFormFieldTitleEmailInUse">
                            {props.authStatus}
                        </h3>
                    </div>
                    <Field
                        name="password"
                        label="password"
                        type="password"
                        placeholder="Password"
                        component={renderPasswordInput}
                    />
                </div>

                <button className="signInButton" data-testid="signInButton">
                    Sign In
                </button>
            </form>
        </React.Fragment>
    );
};

const validate = (
    formValues: SignInFormValues
): FormErrors<SignInFormValues> => {
    //MUST BE NAMED VALIDATE! Other names would be ignored by reduxForm(..)
    const errors: FormErrors<SignInFormValues> = {};
    //If you return an empty object, redux form will assume everything is ok
    if (!formValues.email) {
        //user did not enter title, so undefined
        errors.email = "You must enter an email";
        //Must be the same name as field name! The "error" property in {meta} would receive this
    }
    if (!formValues.password) {
        errors.password = "You must enter a password";
    }
    return errors;
    //Erors is going to be passed to renderInput's meta
};

const mapStateToProps = (state: StoreState) => {
    return {
        // authStatus: state.authStatus.errorMessage,
    };
};

export default connect(
    mapStateToProps,
    {}
)(
    reduxForm<{}, SignInFormProps>({
        form: "signInForm",
        validate,
    })(SignInForm)
);
