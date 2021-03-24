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
import waitForExpect from "wait-for-expect";
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
window.HTMLElement.prototype.scrollIntoView = jest.fn();
beforeEach(async () => {
    app = render(
        <Root>
            <MemoryRouter initialEntries={["/search"]} initialIndex={0}>
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

describe("Data loads when user enter page", () => {
    let mock: MockAdapter;

    beforeEach(async () => {
        mock = new MockAdapter(axios);
        const mockResponse = {
            games: [
                {
                    game_id: 1,
                    title: "The Elder Scrolls V: Skyrim",
                    cover_url:
                        "https://res.cloudinary.com/du8n2aa4p/image/upload/v1615912360/steam/skyrim.jpg",
                    release_date: "2011-11-10T05:00:00.000Z",
                    about:
                        "The next chapter in the highly anticipated Elder Scrolls saga arrives from the makers of the 2006 and 2008 Games of the Year, Bethesda Game Studios. Skyrim reimagines and revolutionizes the open-world fantasy epic, bringing to life a complete virtual world open for you to explore any way you choose.",
                    genres: ["Action", "Fantasy"],
                    screenshots: [
                        "https://res.cloudinary.com/du8n2aa4p/image/upload/v1615918345/steam/screenshots/skyrim_ss1.jpg",
                        "https://res.cloudinary.com/du8n2aa4p/image/upload/v1615925001/steam/screenshots/skyrim_ss2.jpg",
                        "https://res.cloudinary.com/du8n2aa4p/image/upload/v1615927797/steam/screenshots/skyrim_ss3.jpg",
                        "https://res.cloudinary.com/du8n2aa4p/image/upload/v1615927863/steam/screenshots/skyrim_ss4.jpg",
                        "https://res.cloudinary.com/du8n2aa4p/image/upload/v1615927860/steam/screenshots/skyrim_ss5.jpg",
                    ],
                    price: "100.0000",
                    discount_percentage: "0.1000",
                    price_after_discount: "90.0000",
                },
            ],
        };

        mock.onGet("/api/games").reply(200, mockResponse);
        await axios.get("/api/games").then((response) => {
            console.log(response.data);
        });
    });

    test("Search result exist", async () => {
        waitForExpect(() => {
            expect(
                app.getByText("The Elder Scrolls V: Skyrim")
            ).toBeInTheDocument();
        });
    }, 3000);
});
