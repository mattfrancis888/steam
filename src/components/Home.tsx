import React, { useState, useEffect } from "react";
import { Router } from "react-router-dom";
import history from "../browserHistory";
import Routes from "./Routes";
import FeaturedCarousel from "./FeaturedCarousel";
import SpecialOfferCarousel from "./SpecialOfferCarousel";
import CommunityCarousel from "./CommunityCarousel";
import _ from "lodash";
import { fetchGames, fetchDiscountedGames, Game } from "../actions";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
import { GamesStateResponse } from "../reducers/gamesReducer";
import { ErrorStateResponse } from "reducers/errorReducer";
import { LG_SCREEN_SIZE, MED_SCREEN_SIZE } from "../constants";
import Loading from "./Loading";
import useWindowDimensions from "../windowDimensions";
import Searchbar from "./Searchbar";
import CartAndSearchbar from "./CartAndSearchbar";
import anime from "animejs/lib/anime.es.js";
export interface FeaturedCarouselProps {
    content: Game[];
}
export interface SpecialOfferCarouselProps {
    content: Game[];
}
export interface CommunityCarouelProps {
    content: Game[];
}

interface HomeProps {
    games: GamesStateResponse;
    discountedGames: GamesStateResponse;
    errors: ErrorStateResponse;
    fetchGames(): void;
    fetchDiscountedGames(): void;
}

const Home: React.FC<HomeProps> = (props) => {
    let localCart = localStorage.getItem("cart");
    const [hoverData, setHoverData] = useState(-9); //We can also switch this ot 1 since our first game has a game_id of 1
    const [specialsTabClicked, setSpecialsTabClicked] = useState(false);
    useEffect(() => {
        props.fetchGames();
        props.fetchDiscountedGames();
    }, []);

    useEffect(() => {
        if (props.games.data)
            if (props.games.data.games.length > 0)
                //Get game id of first game
                setHoverData(props.games.data.games[0].game_id);
    }, [props.games.data]);

    const { width } = useWindowDimensions();

    const renderGenresForGameText = (gameId: number) => {
        let filteredContent = _.filter(props.games.data?.games, {
            game_id: gameId,
        });
        if (filteredContent.length === 0)
            filteredContent = _.filter(props.discountedGames.data?.games, {
                game_id: gameId,
            });
        if (filteredContent.length > 0)
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

        if (filteredContent.length === 0)
            filteredContent = _.filter(props.discountedGames.data?.games, {
                game_id: gameId,
            });

        if (filteredContent.length > 0)
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
        let game = _.filter(props.games.data?.games, {
            game_id: gameId,
        });
        if (game.length === 0)
            game = _.filter(props.discountedGames.data?.games, {
                game_id: gameId,
            });
        let maxScreenshotToShow = 4;

        if (game.length > 0)
            return game[0].screenshots.map((screenshot, index) => {
                if (index < maxScreenshotToShow)
                    return (
                        <img
                            className={`gameChartScreenshotPreview gameChartScreenshotPreview${index}`}
                            key={index}
                            onLoad={() => {
                                anime({
                                    targets: `.gameChartScreenshotPreview${index}`,
                                    opacity: [
                                        {
                                            value: [0, 1],
                                            duration: 250,
                                            easing: "easeOutQuad",
                                        },
                                    ],
                                });
                            }}
                            src={screenshot}
                            alt="preview"
                        ></img>
                    );
            });
    };

    const renderPrice = (content: Game) => {
        if (parseFloat(content.discount_percentage) > 0) {
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

    const renderChartGames = () => {
        let contentToRender = props.games.data?.games;
        if (specialsTabClicked === true) {
            contentToRender = props.discountedGames.data?.games;
        }
        if (contentToRender)
            return contentToRender.map((content, index) => {
                if (index < 11) {
                    return (
                        <div
                            onClick={() => {
                                history.push(`game/${content.game_id}`);
                            }}
                            key={index}
                            className={`chartGameContainer ${
                                hoverData === content.game_id
                                    ? "chartGameContainerToggled"
                                    : ""
                            }`}
                            onMouseOver={() => {
                                setHoverData(content.game_id);
                            }}
                        >
                            <div
                                className={`chartGameImage chartGameImage${index}`}
                                onLoad={() => {
                                    anime({
                                        targets: `.chartGameImage${index}`,
                                        // Properties
                                        // Animation Parameters

                                        opacity: [
                                            {
                                                value: [0, 1],
                                                duration: 250,
                                                easing: "easeOutQuad",
                                            },
                                        ],
                                    });
                                }}
                            >
                                <img src={content.cover_url} alt="game"></img>
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
                    );
                }
            });
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
        } else if (props.games.data && props.discountedGames.data) {
            //If we enter a search that's not found, our reducer will have games as an empty array
            //It takes time for React to change our reducer after calling props.fetchGames() and props.fetchDiscountedGames()
            if (
                props.games.data.games.length > 0 &&
                props.discountedGames.data.games.length > 0
            ) {
                let specialTabsHoverData =
                    props.discountedGames.data?.games[0].game_id;
                let carouselSplit = _.chunk(props.games.data.games, 4);
                return (
                    <div className="homeContainer">
                        <div className="homeFirstSection">
                            <CartAndSearchbar />
                            <h1 className="bannerTitle">
                                Featured And Recommended
                            </h1>

                            <FeaturedCarousel content={carouselSplit[0]} />
                            <h1 className="bannerTitle">Special Offers</h1>
                            <SpecialOfferCarousel
                                content={props.discountedGames.data.games}
                            />
                            <h1 className="bannerTitle">
                                The Community Recommends
                            </h1>
                            <CommunityCarousel
                                content={props.games.data.games}
                            />
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
                                onClick={() => {
                                    setSpecialsTabClicked(true);
                                    setHoverData(specialTabsHoverData);
                                }}
                            >
                                Specials
                            </div>
                        </div>

                        <div className="chart">
                            <div className="chartGamesColumn">
                                <div className="seeMoreWrap">
                                    <p className="seeMoreText">See More:</p>
                                    <div
                                        className="chartSeeMore"
                                        onClick={() => {
                                            if (specialsTabClicked) {
                                                history.push({
                                                    pathname: "/search",
                                                    search: `?specials`,
                                                });
                                            } else {
                                                history.push({
                                                    pathname: "/search",
                                                });
                                            }
                                        }}
                                    >
                                        {specialsTabClicked
                                            ? "Specials"
                                            : "Top Sellers"}
                                    </div>
                                </div>
                                {renderChartGames()}
                            </div>
                            {renderChartGamePreview(hoverData)}
                        </div>
                    </div>
                );
            } else {
                return null;
            }
        } else {
            return <Loading />;
        }
    };

    const renderChartGamePreview = (gameId: number) => {
        let filteredContent = _.filter(props.games.data?.games, {
            game_id: gameId,
        });
        if (filteredContent.length > 0)
            return (
                <div className="chartGamePreviewHover">
                    <p className="chartGamePreviewTitle">
                        {filteredContent.map((content, index) => {
                            return content.title;
                        })}
                    </p>

                    <div className="chartGamePreviewGenresWrap">
                        {renderGenresForGameTag(gameId)}
                    </div>
                    <div className="chartGamePreviewScreenshots">
                        {renderScreenshotsForGame(gameId)}
                    </div>
                </div>
            );
    };
    return <React.Fragment>{renderContent()}</React.Fragment>;
};

const mapStateToProps = (state: StoreState) => {
    return {
        games: state.games,
        discountedGames: state.discountedGames,
        errors: state.errors,
    };
};

export default connect(mapStateToProps, {
    fetchGames,
    fetchDiscountedGames,
})(Home);
