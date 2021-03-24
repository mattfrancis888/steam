//FUTURE ME: Proxy in package.json breaks nock's tests;
//mocking cookies work; didn't fully test the app, but I get the idea :)
import Root from "Root";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router";
import Routes from "components/Routes";
import {
    render,
    cleanup,
    RenderResult,
    fireEvent,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import history from "browserHistory";
let pushSpy: jest.SpyInstance;
let app: RenderResult;
afterEach(() => {
    cleanup();
});

//Use this because with our current version of react, mp4's muted has issues with testing
//It will give a log/ warning about flushing updates
//https://github.com/testing-library/react-testing-library/issues/470
Object.defineProperty(HTMLMediaElement.prototype, "muted", {
    set: () => {},
});
beforeEach(async () => {
    app = render(
        <Root>
            <MemoryRouter initialEntries={["/"]} initialIndex={0}>
                <Routes />
            </MemoryRouter>
        </Root>
    );

    //Mocking history:
    //https://www.reddit.com/r/reactjs/comments/b1hsno/how_can_i_test_historypush_inside_action/
    pushSpy = jest.spyOn(history, "push");
});

test("Steam logo clicked", async () => {
    act(() => {
        fireEvent.click(app.getByTestId("steamHeaderLogo"));
    });
    history.push("/");
    expect(pushSpy).toBeCalledWith("/");
    pushSpy.mockRestore();
});

test("Sign in clicked", async () => {
    //Mock cookie

    act(() => {
        fireEvent.click(app.getByTestId("signInOrSignOut"));
    });
    history.push("/signin");
    expect(pushSpy).toBeCalledWith("/signin");
});

test("Sign out clicked", async () => {
    //Mock cookie
    jest.mock("js-cookie", () => ({ get: () => "ACCESS_TOKEN" }), {
        virtual: true,
    });
    act(() => {
        fireEvent.click(app.getByTestId("signInOrSignOut"));
    });
    let mock = new MockAdapter(axios);
    let mockResponse = {
        token: "",
    };
    mock.onPost("/api/signout").reply(200, mockResponse);

    return axios.post("/api/signout").then((response) => {
        console.log(response.data);
        history.push("/");
        expect(pushSpy).toBeCalledWith("/");
        pushSpy.mockRestore();
    });
});
