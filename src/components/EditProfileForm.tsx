import React, { useRef, useEffect, useState } from "react";
import {
    Field,
    reduxForm,
    change,
    FormErrors,
    InjectedFormProps,
} from "redux-form";
//compose is used to make it easier to "organize" mapStateToProps and redux form
import { StoreState } from "../reducers";
import { connect } from "react-redux";
import Loading from "./Loading";
import { SERVER_ERROR_MESSAGE } from "../constants";
import { useLocation } from "react-router-dom";
import history from "../browserHistory";
import defaultAvatar from "../img/defaultAvatar.png";
import { EditProfileFormProps } from "./Profile";
export interface EditProfileFormValues {
    username: string;
    imagePreview: string;
    image: any;
}

const renderError = ({ error, touched }: any) => {
    if (touched && error) {
        //Touched (for input) will be false at first
        //When clicked and then clicked otuside of the input, it will be true
        return <div className="errorText">{error}</div>;
    }
};

const renderAutoFocusTextInput = ({ input, label, meta, placeHolder }: any) => {
    //I think there's a bug with the librrary
    //If we have initialValues set for the form and then we don't have an autofocs on for a field
    //refs such as openFileExplorer will not be generated until a text is actualy focused.
    //If we remove the initialValues, refs will be rendered.
    return (
        <div className="editProfileInputsWrap">
            {/* <label>{label}</label> */}
            <input
                className="editProfileInputs"
                {...input}
                autoComplete="off"
                autoFocus
            />
            {renderError(meta)}
        </div>
    );
};

const renderFieldSectionLayout = (title: string, children: JSX.Element) => {
    return (
        <div className="editProfileFieldSection">
            <div className="editProfileFieldTitleWrap">
                <h1>{title}</h1>
            </div>
            {children}
        </div>
    );
};
const EditProfileForm: React.FC<
    EditProfileFormProps & InjectedFormProps<{}, EditProfileFormProps>
> = (props) => {
    const location = useLocation();
    const openFileExplorer = useRef(null);
    const [listingImage, setListingImage] = useState<string | null>(null);
    const [cloudinaryImage, setCloudinaryImage] = useState<string | null>(null);

    useEffect(() => {
        if (props.cloudinaryImage) setCloudinaryImage(props.cloudinaryImage);
    }, []);

    const onSubmit = (formValues: any, dispatch: any) => {
        props.onSubmit(formValues);
    };

    const renderImageUpload = ({
        input,
        label,
        meta,
        placeHolder,
        optionValues,
    }: any) => {
        //We cannot pass in {...input} (so that the input is submited when onSubmit button is clicked) like our other renders because <input> has type="file"
        //Must do this instead: https://github.com/redux-form/redux-form/issues/3686
        //We do not have a name in <input> so that redux won't complain with validate (thus making this input optional)

        return (
            <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={openFileExplorer}
                onChange={(...args) => {
                    //The input's text dosen't change but the input is actually inserted (do formValues.image below)
                    //  let event = args.map((val) => val.nativeEvent)[0];
                    input.onChange(...args);
                    //@ts-ignore
                    // setListingImage(URL.createObjectURL(event.target.files[0]));
                    //chagne also dosen't change the textbox input
                    // props.dispatch(
                    //     change("postAdForm", "image", event.target.files[0])
                    // );
                }}
            />
        );
    };

    const renderImageUploadPreview = ({
        input,
        label,
        meta,
        placeHolder,
        optionValues,
    }: any) => {
        //We cannot pass in {...input} (so that the input is submited when onSubmit button is clicked) like our other renders because <input> has type="file"
        //Must do this instead: https://github.com/redux-form/redux-form/issues/3686
        //We do not have a name in <input> so that redux won't complain with validate (thus making this input optional)

        return (
            <input
                type="button"
                {...input}
                className="editProfileAvatar"
                onClick={() => {
                    // @ts-ignore
                    openFileExplorer.current.click();
                }}
                style={renderImage()}
            />
        );
    };

    const renderImage = () => {
        if (cloudinaryImage) {
            return {
                backgroundImage: `url(${cloudinaryImage}), url(${defaultAvatar})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundColor: "rgba(58, 62, 71, 0.5);",
            };
        } else if (!cloudinaryImage && listingImage) {
            return {
                backgroundImage: `url(${listingImage}), url(${defaultAvatar})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundColor: "rgba(58, 62, 71, 0.5);",
            };
        } else {
            return {
                backgroundImage: `url(${defaultAvatar})`,
            };
        }
    };

    const renderFields = (): JSX.Element => {
        return (
            <form
                className="editProfileForm"
                onSubmit={props.handleSubmit(onSubmit)}
            >
                {renderFieldSectionLayout(
                    "Username",
                    <Field
                        name="username"
                        type="text"
                        // label="Ad Title"

                        component={renderAutoFocusTextInput}
                    />
                )}

                {renderFieldSectionLayout(
                    "Avatar",
                    <React.Fragment>
                        <Field
                            name="image"
                            type="file"
                            component={renderImageUpload}
                            //@ts-ignore dont worry
                            value={listingImage}
                            ref={openFileExplorer}
                            withRef
                            onChange={(event: any) => {
                                //For some reason,
                                //The input's text dosen't change but the input is actually inserted (do formValues.image below)
                                setCloudinaryImage(null);
                                setListingImage(
                                    URL.createObjectURL(event.target.files[0])
                                );
                                props.change("imagePreview", null);

                                // console.log(
                                //     `Selected file - ${event.target.files[0].name}`
                                // );
                                //https://medium.com/@650egor/react-30-day-challenge-day-2-image-upload-preview-2d534f8eaaa
                            }}
                        />
                        <div className="imageUploadWrapper">
                            <Field
                                name="imagePreview"
                                type="button"
                                component={renderImageUploadPreview}
                            />

                            {(listingImage || cloudinaryImage) && (
                                <h3
                                    className="removeUploadedImage"
                                    onClick={() => {
                                        setListingImage(null);
                                        setCloudinaryImage(null);
                                        props.dispatch(
                                            change(
                                                "editProfileForm",
                                                "image",
                                                null
                                            )
                                        );
                                        props.change("imagePreview", null);
                                    }}
                                >
                                    Remove
                                </h3>
                            )}
                        </div>
                    </React.Fragment>
                )}
                <div className="editProfileSubmitWrap">
                    <button className="editProfileSubmit">Edit Profile</button>
                </div>
            </form>
        );
    };

    return <React.Fragment>{renderFields()}</React.Fragment>;
};

const validate = (
    formValues: EditProfileFormValues
): FormErrors<EditProfileFormValues> => {
    //MUST BE NAMED VALIDATE! Other names would be ignored by reduxForm(..)
    const errors: FormErrors<EditProfileFormValues> = {};
    //If you return an empty object, redux form will assume everything is ok
    // console.log("FILE UPLOAD VALUE", formValues.image);
    if (!formValues.username) {
        //user did not enter title, so undefined
        errors.username = "You must enter a username";
        //Must be the same name as field name! The "error" property in {meta} would receive this
    }

    return errors;
    //Erors is going to be passed to renderInput's meta
};

const mapStateToProps = (state: StoreState) => {
    return {
        // listingDetail: state.listingInfo.data,
    };
};

export default connect(mapStateToProps, {
    // fetchCategoriesForListing
})(
    reduxForm<{}, EditProfileFormProps>({
        form: "editProfileForm",
        validate,
        enableReinitialize: true,
    })(EditProfileForm)
);

//enableReinitialize: true is fo:
//initialState does not re-render unless we eable enableReinitialize: true (pretty sure it has to do with the current redux version because
//our music video stream project work without it)
//https://stackoverflow.com/questions/38881324/redux-form-initialvalues-not-updating-with-state
