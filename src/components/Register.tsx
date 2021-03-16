import React from "react";
import RegisterForm, { RegisterFormValues } from "./RegisterForm";
import { StoreState } from "../reducers";
import { connect } from "react-redux";
import { signUp } from "../actions";
export interface RegisterFormProps {
    onSubmit(formValues: any): void;
    authStatus?: string | null;
}

export interface RegisterPlanProps {
    signUp(formValues: any): void;
    authStatus?: string | null;
}

const Register: React.FC<RegisterPlanProps> = (props) => {
    const onSubmitRegister = async (formValues: RegisterFormValues) => {
        props.signUp(formValues);
    };

    return (
        <div className="registerContainer">
            <div className="registerContentWrap">
                <h1 className="createYourAccountHeader">Create your account</h1>
                <RegisterForm
                    onSubmit={(formValues: any) => onSubmitRegister(formValues)}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        authStatus: state.authStatus.authenticated,
    };
};
export default connect(mapStateToProps, { signUp })(Register);
