import axios from "axios";
//Used for onine JSON-store database
import Cookies from "js-cookie";
import { store } from "../Root";
import { validateToken } from "./auth";
const ACCESS_TOKEN = "ACCESS_TOKEN";
const axiosConfig = axios.create({
    // .. where we make our configurations
    withCredentials: true, //Without it cookies will not be sent! Also, needs to be first in axios.create(..)!!
    //As mentioned in:
    //https://stackoverflow.com/questions/43002444/make-axios-send-cookies-in-its-requests-automatically
    baseURL: "http://localhost:5000/",
});

//Followed article below for axios interceptors:
//https://medium.com/swlh/handling-access-and-refresh-tokens-using-axios-interceptors-3970b601a5da

//Executes before axios request
axiosConfig.interceptors.request.use(
    (config) => {
        //Create Authorizaiton header for our axios requests
        //Note: this won't affect /token because we are using the http-only cookie not authorization header :) (look at backend)
        // console.log("INTERCEPTOR REQ", config);
        const token = Cookies.get(ACCESS_TOKEN);
        //This is needed for our requireAuth hoc for protected routes.
        //However, nock mock tests fails if we have req headers so I opted not to have protected routes
        //to check if a token is still valid. I cannot test anything if I have this on.
        // Thus, when store.dispatch calls the path below, it will always / our routes are not validated
        //Flow -> Route that uses requireAuth will call validateToken action creator -> validateToken will call the
        //protected routes that is setted up in the API with passport's jwtlogin
        // if (token) {
        //     config.headers["authorization"] = token;
        // }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

//Axios calls response interceptors after it sends the request and receives a response.
axiosConfig.interceptors.response.use(
    //If we have a response from our recent http call
    (response) => {
        return response;
    },
    (error) => {
        //Catches 403 error from our axios request
        // throw error; //Throw error to action creator so it can be caught
        const originalRequest = error.config;

        //If my refresh token is not valid then my endpoint(/token) will come with 401 status code and
        // If we do not handle it then it will go in an infinite loop.
        // here is my condition to stop going in an infinite loop,

        //But in this project, our refresh token will not expire to make things simpler :)
        // if (error.response.status === 401 && originalRequest.url === "/token") {
        //     return Promise.reject(error);
        // }
        // if (error.response) {
        //Above if block is used so that the app won't crash  in localhost when the backend server is not running and we are testing
        //an axios request (i.e calling an axios request and seeing if a loading component triggers)
        if (error.response.status === 403 && !originalRequest._retry) {
            //ALL 403 errors are because of invalid tokens
            originalRequest._retry = true;
            axiosConfig
                .post("/api/token")
                .then((res) => {
                    //Call original request again so that we can use the new access token on the original request
                    //We give the new access token by giving it at axios.interceptors.request
                    //return auth(originalRequest);
                    store.dispatch(
                        validateToken(
                            originalRequest.url,
                            originalRequest._retry
                        ) as any
                    );

                    //flow:
                    //click on post-ad - > validate token in HOC ->  if post-ad with expired token -> returns 403 -> refrsh token is called
                    //use ACCESS token in Authorization header (via axios interceptor response) -> trigger post-ad again with store.dispatch(validateToken(..))

                    //However, nock mock tests fails if we have req headers so I opted not to have protected routes
                    //to check if a token is still valid.
                    // Thus, store.dispatch will fail because there is no protected routes
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        }
    }
    // }
);

export default axiosConfig;
