import React from "react";
import RegisterForm, { RegisterFormValues } from "./RegisterForm";

export interface RegisterFormProps {
    onSubmit(formValues: any): void;
    authStatus?: string | null;
}

export interface RegisterPlanProps {
    signUp(formValues: any): void;
    authStatus?: string | null;
}

const Register: React.FC<RegisterPlanProps> = () => {
    const onSubmitRegister = async (formValues: RegisterFormValues) => {
        // props.signUp(formValues);
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

export default Register;
