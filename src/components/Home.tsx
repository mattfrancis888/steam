import React, { useState, useEffect } from "react";
import { Router } from "react-router-dom";
import history from "../browserHistory";
import Routes from "./Routes";
import FeaturedCarousel from "./FeaturedCarousel";
import SpecialOfferCarousel from "./SpecialOfferCarousel";
import CommunityCarousel from "./CommunityCarousel";
import _ from "lodash";
import { connect } from "react-redux";
import {
    fetchGamesBaseInfo,
    fetchGamesGenres,
    fetchGamesScreenshot,
    GameBaseInfo,
} from "../actions";
import { StoreState } from "../reducers";
import { GamesBaseInfoStateResponse } from "../reducers/gamesBaseInfoReducer";
import { ErrorStateResponse } from "reducers/errorReducer";
import { LG_SCREEN_SIZE, MED_SCREEN_SIZE } from "../constants";
import Loading from "./Loading";
import useWindowDimensions from "../windowDimensions";
import { GamesGenreStateResponse } from "reducers/gamesGenreReducer";
import { GamesScreenshotStateResponse } from "reducers/gamesScreenshotReducer";
export const games = [
    {
        image:
            "https://cdn.akamai.steamstatic.com/steam/apps/489830/ss_921ccea650df936a0b14ebd5dd4ecc73c1d2a12d.600x338.jpg?t=1590515887",
    },
    {
        image:
            "https://cdn.akamai.steamstatic.com/steam/apps/1086940/capsule_616x353.jpg?t=1614870777",
    },
];

const specialOfferGamesMock: GameBaseInfo[] = [
    {
        about:
            "The next chapter in the highly anticipated Elder Scrolls saga arrives from the makers of the 2006 and 2008 Games of the Year, Bethesda Game Studios. Skyrim reimagines and revolutionizes the open-world fantasy epic, bringing to life a complete virtual world open for you to explore any way you choose.",
        cover_url:
            "https://res.cloudinary.com/du8n2aa4p/image/upload/v1615912360/steam/skyrim.jpg",
        discount_percentage: "0.1000",
        game_id: 1,
        name_tokens: "ee",
        price: "100.0000",
        price_after_discount: "10.0000",
        price_id: 1,
        release_date: "2011-11-10T05:00:00.000Z",
        title: "The Elder Scrolls V: Skyrim",
    },
];

export interface Game {
    image: string;
}
export interface FeaturedCarouselProps {
    content: GameBaseInfo[];
    gamesBaseInfo: GamesBaseInfoStateResponse;
    gamesGenre: GamesGenreStateResponse;
    gamesScreenshot: GamesScreenshotStateResponse;
}
export interface SpecialOfferCarouselProps {
    // content: GameBaseInfo[];
    //GameBaseInfo[] type won't work; its because of lodash' reject using FlatArray
    content: any;
}
export interface CommunityCarouelProps {
    content: GameBaseInfo[];
}

interface HomeProps {
    gamesBaseInfo: GamesBaseInfoStateResponse;
    gamesGenre: GamesGenreStateResponse;
    gamesScreenshot: GamesScreenshotStateResponse;
    errors: ErrorStateResponse;
    fetchGamesBaseInfo(): void;
    fetchGamesGenres(): void;
    fetchGamesScreenshot(): void;
}

const Home: React.FC<HomeProps> = (props) => {
    useEffect(() => {
        props.fetchGamesBaseInfo();
        props.fetchGamesGenres();
        props.fetchGamesScreenshot();
    }, []);

    const [hoverData, setHoverData] = useState(1);
    const { width } = useWindowDimensions();

    const renderGenresForGameText = (gameId: number) => {
        let genres = _.filter(props.gamesGenre.data?.games, {
            game_id: gameId,
        });

        return genres.map((genre, index) => {
            if (genres.length === index + 1) {
                return ` ${genre.genre_type}`;
            }
            return ` ${genre.genre_type},`;
        });
    };

    const renderGenresForGameTag = (gameId: number) => {
        let genres = _.filter(props.gamesGenre.data?.games, {
            game_id: gameId,
        });

        return genres.map((genre, index) => {
            return (
                <p key={index} className="chartGamePreviewGenres">
                    {genre.genre_type}
                </p>
            );
        });
    };

    const renderScreenshotsForGame = (gameId: number) => {
        let screenshots = _.filter(props.gamesScreenshot.data?.games, {
            game_id: gameId,
        });
        const screenshotsSplit = _.chunk(screenshots, 4);
        return screenshotsSplit[0].map((screenshot, index) => {
            return <img src={screenshot.screenshot_url} alt="preview"></img>;
        });
    };

    const renderPrice = (content: GameBaseInfo) => {
        if (content.discount_percentage) {
            return (
                <div className="chartAdjustedPriceWrap">
                    <div className="chartDiscount">
                        -{parseFloat(content.discount_percentage) * 100}%
                    </div>
                    <div>
                        <p className="chartOrigPriceStriked">
                            ${parseFloat(content.price).toFixed(2)}
                        </p>
                        <p className="chartGamePrice">
                            $
                            {parseFloat(content.price_after_discount).toFixed(
                                2
                            )}
                        </p>
                    </div>
                </div>
            );
        } else {
            //no discount
            return (
                <p className="chartGamePrice">
                    ${parseFloat(content.price).toFixed(2)}
                </p>
            );
        }
    };

    const renderContent = () => {
        if (props.errors.data?.error) {
            return (
                <div className="serverErrorContainer">
                    <h3 className="serverErrorText">
                        {props.errors.data?.error}
                    </h3>
                </div>
            );
        } else if (
            props.gamesBaseInfo.data &&
            props.gamesGenre.data &&
            props.gamesScreenshot.data
        ) {
            const gamesBaseInfo = _.chunk(props.gamesBaseInfo.data.games, 4);

            const specialOfferContent = _.reject(
                props.gamesBaseInfo.data?.games,
                {
                    discount_percentage: null,
                }
            );

            return (
                <div className="homeContainer">
                    <div className="homeFirstSection">
                        <h1 className="bannerTitle">
                            Featured And Recommended
                        </h1>
                        <FeaturedCarousel content={gamesBaseInfo[0]} />
                        <h1 className="bannerTitle">Special Offers</h1>
                        <SpecialOfferCarousel content={specialOfferContent} />
                        <h1 className="bannerTitle">
                            The Community Recommends
                        </h1>
                        <CommunityCarousel content={gamesBaseInfo[0]} />
                    </div>
                    <div className="chartTabsWrap">
                        <div className="chartTab">Top Sellers</div>
                        <div className="chartTab">Specials</div>
                    </div>

                    <div className="chart">
                        <div className="chartGamesColumn">
                            {props.gamesBaseInfo.data.games.map(
                                (content, index) => {
                                    return (
                                        <React.Fragment>
                                            <div
                                                key={index}
                                                className={`chartGameContainer ${
                                                    hoverData ===
                                                    content.game_id
                                                        ? "chartGameContainerToggled"
                                                        : ""
                                                }`}
                                                onMouseOver={() => {
                                                    setHoverData(
                                                        content.game_id
                                                    );
                                                }}
                                                onClick={(event) => {}}
                                            >
                                                <div className="chartGameImage">
                                                    <img
                                                        src={content.cover_url}
                                                        alt="game"
                                                    ></img>
                                                </div>
                                                <div className="chartGameInfo">
                                                    <div className="chartGameGenreAndTitle">
                                                        <p className="chartGameTitle">
                                                            {content.title}
                                                        </p>
                                                        <p className="chartGameGenres">
                                                            {renderGenresForGameText(
                                                                content.game_id
                                                            )}
                                                        </p>
                                                    </div>
                                                    {renderPrice(content)}
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    );
                                }
                            )}
                        </div>
                        {renderChartGamePreview(hoverData)}
                    </div>
                </div>
            );
        } else {
            return <Loading />;
        }
    };

    const renderChartGamePreview = (game_id: number) => {
        // if (hoverData === index && width > LG_SCREEN_SIZE) {

        let baseInfo = _.filter(props.gamesBaseInfo.data?.games, {
            game_id: game_id,
        });

        return (
            <div className="chartGamePreviewHover">
                <p className="chartGamePreviewTitle">
                    {baseInfo.map((content, index) => {
                        return content.title;
                    })}
                </p>
                <div className="chartGamePreviewGenresWrap">
                    {renderGenresForGameTag(game_id)}
                </div>
                <div className="chartGamePreviewScreenshots">
                    {renderScreenshotsForGame(game_id)}
                </div>
            </div>
        );
        // } else {
        //     return null;
        // }
    };
    return <React.Fragment>{renderContent()}</React.Fragment>;
};

const mapStateToProps = (state: StoreState) => {
    return {
        gamesBaseInfo: state.gamesBaseInfo,
        gamesGenre: state.gamesGenre,
        gamesScreenshot: state.gamesScreenshot,
        errors: state.errors,
    };
};

export default connect(mapStateToProps, {
    fetchGamesBaseInfo,
    fetchGamesGenres,
    fetchGamesScreenshot,
})(Home);
