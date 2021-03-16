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
            <MemoryRouter initialEntries={["/register"]} initialIndex={0}>
                <Routes />
            </MemoryRouter>
        </Root>
    );

    //Mocking history:
    //https://www.reddit.com/r/reactjs/comments/b1hsno/how_can_i_test_historypush_inside_action/
    pushSpy = jest.spyOn(history, "push");
});

test("Sections exist", async () => {
    expect(app.getByText(/email/i)).toBeInTheDocument();
    expect(app.getByText(/password/i)).toBeInTheDocument();
    expect(app.getByText(/username/i)).toBeInTheDocument();
});

test("Register form on submit", async () => {
    const mockResponse = {
        token: "asdfsadf12",
        refreshToken: "asdufahsfd",
    };

    const expectedMockFormValues = {
        email: "hi@gmail.com",
        password: "123",
    };

    fireEvent.change(app.getByTestId("email"), {
        target: { value: expectedMockFormValues.email },
    });
    fireEvent.change(app.getByTestId("password"), {
        target: { value: expectedMockFormValues.password },
    });
    fireEvent.change(app.getByTestId("username"), {
        target: { value: expectedMockFormValues.password },
    });

    act(() => {
        fireEvent.click(app.getByTestId("registerButton"));
    });

    let mock = new MockAdapter(axios);
    mock.onPost("/api/signup").reply(200, mockResponse);

    return axios.post("/api/signup").then((response) => {
        console.log(response.data);
    });
});
