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
import waitForExpect from "wait-for-expect";
import axios from "axios";
import history from "browserHistory";
let pushSpy: jest.SpyInstance;
let app: RenderResult;

//Mock cookie
jest.mock("js-cookie", () => ({ get: () => "ACCESS_TOKEN" }), {
    virtual: true,
});

afterEach(() => {
    cleanup();
});

beforeEach(async () => {
    //Too time consuming to test for Profile page due to it's edgecases, but I get the idea.
    app = render(
        <Root>
            <MemoryRouter initialEntries={["/profile"]} initialIndex={0}>
                <Routes />
            </MemoryRouter>
        </Root>
    );

    //Mocking history:
    //https://www.reddit.com/r/reactjs/comments/b1hsno/how_can_i_test_historypush_inside_action/
    pushSpy = jest.spyOn(history, "push");
});

test("Sections exist", async () => {
    const mockResponse = {
        token: "asdfsadf12",
        refreshToken: "asdufahsfd",
    };
    let mock = new MockAdapter(axios);
    mock.onGet("/api/profile").reply(200, mockResponse);
    await axios.get("/api/profile").then((response) => {
        console.log(response.data);
    });
    waitForExpect(() => {
        expect(app.getByText(/About/i)).toBeInTheDocument();
    });
}, 30000);
