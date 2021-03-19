//THIS FILE IS USED FOR CORE RE-USABILITY; SPECIFICALLY FOR JEST/ENZYME TESTING
import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "./constants";
export const store = createStore(
    reducers,
    { authStatus: { authenticated: Cookies.get(ACCESS_TOKEN) } },
    //if our inital state (authStauts) has a token from local storage, keep them logged in
    composeWithDevTools(applyMiddleware(reduxThunk))
);

interface IProps {
    initialState?: {};
    //Optional property so that not every file has to use initialState (initialState is used for testing)
    children: any;
    // any other props that come into the component
}
const provider = ({ initialState = {}, children }: IProps) => {
    // const store = createStore(
    //     reducers,
    //     { authStatus: { authenticated: Cookies.get("ACCESS_TOKEN") } },
    //     //if our inital state (authStauts) has a token from local storage, keep them logged in
    //     composeWithDevTools(applyMiddleware(reduxThunk))
    // );

    return <Provider store={store}>{children}</Provider>;
};
export default provider;
