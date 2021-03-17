import React, { useState, useEffect } from "react";
import { Router } from "react-router-dom";
import history from "../browserHistory";
import Routes from "./Routes";
import FeaturedCarousel from "./FeaturedCarousel";
import SpecialOfferCarousel from "./SpecialOfferCarousel";
import CommunityCarousel from "./CommunityCarousel";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchGames, FetchGamesResponse, Game } from "../actions";
import { StoreState } from "../reducers";
import { GamesStateResponse } from "../reducers/gamesReducer";
import { ErrorStateResponse } from "reducers/errorReducer";
import { LG_SCREEN_SIZE, MED_SCREEN_SIZE } from "../constants";
import Loading from "./Loading";
import useWindowDimensions from "../windowDimensions";
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

// export interface Game {
//     image: string;
// }
export interface FeaturedCarouselProps {
    content: Game[];
}
export interface SpecialOfferCarouselProps {
    // content: GameBaseInfo[];
    //GameBaseInfo[] type won't work; its because of lodash' reject using FlatArray
    content: any;
}
export interface CommunityCarouelProps {
    content: Game[];
}

interface HomeProps {
    games: GamesStateResponse;
    errors: ErrorStateResponse;
    fetchGames(): void;
}

const Home: React.FC<HomeProps> = (props) => {
    const [hoverData, setHoverData] = useState(1);
    const [specialsTabClicked, setSpecialsTabClicked] = useState(false);
    useEffect(() => {
        props.fetchGames();
    }, []);

    // useEffect(() => {
    //     props.fetchGamesDiscountedBaseInfo();
    // }, [specialsTabClicked]);

    const { width } = useWindowDimensions();

    const renderGenresForGameText = (gameId: number) => {
        let filteredContent = _.filter(props.games.data?.games, {
            game_id: gameId,
        });

        return filteredContent.map((content, index) => {
            return content.genres.map((genre, index) => {
                if (content.genres.length === index + 1) {
                    return ` ${genre}`;
                }
                return ` ${genre},`;
            });
        });
    };

    const renderGenresForGameTag = (gameId: number) => {
        let filteredContent = _.filter(props.games.data?.games, {
            game_id: gameId,
        });

        return filteredContent.map((content, index) => {
            return content.genres.map((genre, index) => {
                return (
                    <p key={index} className="chartGamePreviewGenres">
                        {genre}
                    </p>
                );
            });
        });
    };

    const renderScreenshotsForGame = (gameId: number) => {
        let screenshots = _.filter(props.games.data?.games, {
            game_id: gameId,
        });
        const screenshotsSplit = _.chunk(screenshots, 4);
        return screenshotsSplit[0][0].screenshots.map((screenshot, index) => {
            return <img src={screenshot} alt="preview"></img>;
        });
    };

    const renderPrice = (content: Game) => {
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
        } else if (props.games.data) {
            // const gamesBaseInfo = _.chunk(props.games.data.games, 4);

            // const specialOfferContent = _.reject(
            //     props.games.data?.games,
            //     {
            //         discount_percentage: null,
            //     }
            // );
            // console.log("SPECIAL_OFFER", specialOfferContent);
            return (
                <div className="homeContainer">
                    <div className="homeFirstSection">
                        <h1 className="bannerTitle">
                            Featured And Recommended
                        </h1>
                        {/* <FeaturedCarousel content={gamesBaseInfo[0]} /> */}
                        <h1 className="bannerTitle">Special Offers</h1>
                        {/* <SpecialOfferCarousel content={specialOfferContent} /> */}
                        <h1 className="bannerTitle">
                            The Community Recommends
                        </h1>
                        {/* <CommunityCarousel content={gamesBaseInfo[0]} /> */}
                    </div>
                    <div className="chartTabsWrap">
                        <div
                            className={`chartTab ${
                                specialsTabClicked ? "" : " chartTabToggled"
                            }`}
                            onClick={() => setSpecialsTabClicked(false)}
                        >
                            Top Sellers
                        </div>
                        <div
                            className={`chartTab ${
                                specialsTabClicked ? "chartTabToggled" : ""
                            }`}
                            onClick={() => setSpecialsTabClicked(true)}
                        >
                            Specials
                        </div>
                    </div>

                    <div className="chart">
                        <div className="chartGamesColumn">
                            {props.games.data.games.map((content, index) => {
                                return (
                                    <React.Fragment>
                                        <div
                                            key={index}
                                            className={`chartGameContainer ${
                                                hoverData === content.game_id
                                                    ? "chartGameContainerToggled"
                                                    : ""
                                            }`}
                                            onMouseOver={() => {
                                                setHoverData(content.game_id);
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
                            })}
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

        let baseInfo = _.filter(props.games.data?.games, {
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
        games: state.games,
        errors: state.errors,
    };
};

export default connect(mapStateToProps, {
    fetchGames,
})(Home);
