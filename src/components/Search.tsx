import React, { useEffect, useState, useRef } from "react";
import {
    fetchGames,
    fetchDiscountedGames,
    Game,
    fetchGamesByKeyword,
} from "../actions";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
import { GamesStateResponse } from "../reducers/gamesReducer";
import { ErrorStateResponse } from "reducers/errorReducer";
import Loading from "./Loading";
import history from "../browserHistory";
import moment from "moment";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import _ from "lodash";
import Searchbar from "./Searchbar";
import anime from "animejs/lib/anime.es.js";
import CartAndSearchbar from "./CartAndSearchbar";
interface SearchProps {
    games: GamesStateResponse;
    discountedGames: GamesStateResponse;
    errors: ErrorStateResponse;
    fetchGames(): void;
    fetchDiscountedGames(): void;
    fetchGamesByKeyword(query: string | string[]): void;
}

const Search: React.FC<SearchProps> = (props) => {
    //For Query Strings:
    const { search } = useLocation();
    const queryValues = queryString.parse(search);

    const [hoverData, setHoverData] = useState(1);
    let localCart = localStorage.getItem("cart");
    useEffect(() => {
        if (queryValues.q) {
            props.fetchGamesByKeyword(queryValues.q);
        } else if (queryValues.specials !== undefined) {
            props.fetchDiscountedGames();
        } else props.fetchGames();
    }, []);

    useEffect(() => {
        if (props.discountedGames.data) {
            if (props.discountedGames.data.games.length > 0)
                setHoverData(props.discountedGames.data.games[0].game_id);
        } else if (props.games.data)
            if (props.games.data.games.length > 0)
                setHoverData(props.games.data.games[0].game_id);
    }, [props.games.data, props.discountedGames.data]);

    const renderScreenshotsForGame = (gameId: number) => {
        let game = _.filter(props.games.data?.games, {
            game_id: gameId,
        });

        if (game.length === 0)
            game = _.filter(props.discountedGames.data?.games, {
                game_id: gameId,
            });
        let maxScreenshotToShow = 1;
        if (game.length > 0)
            return game[0].screenshots.map((screenshot, index) => {
                if (index < maxScreenshotToShow)
                    return (
                        <img
                            className={`searchScreenshotImage searchScreenshotImage${index}`}
                            onLoad={() => {
                                anime({
                                    targets: `.searchScreenshotImage${index}`,
                                    // Properties
                                    // Animation Parameters
                                    opacity: ["0", "1"],

                                    duration: 750,
                                    easing: "easeOutQuad",
                                });
                            }}
                            key={index}
                            src={screenshot}
                            alt="preview"
                        ></img>
                    );
            });
    };

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
                    return (
                        <p key={index} className="searchGameGenres">
                            {genre}
                        </p>
                    );
                });
            });
    };

    const renderChartGamePreview = (gameId: number) => {
        let filteredContent = _.filter(props.games.data?.games, {
            game_id: gameId,
        });

        if (filteredContent.length === 0)
            filteredContent = _.filter(props.discountedGames.data?.games, {
                game_id: gameId,
            });

        if (filteredContent.length > 0)
            return (
                <div
                    className={`searchPreviewHover ${
                        hoverData === gameId ? "" : "hideSearchPreviewHover"
                    }`}
                >
                    <p className="searchGamePreviewTitle">
                        {filteredContent.map((content, index) => {
                            return content.title;
                        })}
                    </p>

                    <div className="chartGamePreviewScreenshots">
                        {renderScreenshotsForGame(gameId)}
                        <div className="searchGameGenresWrap">
                            {renderGenresForGameText(gameId)}
                        </div>
                    </div>
                </div>
            );
    };

    const renderPrice = (content: Game) => {
        if (parseFloat(content.discount_percentage) > 0) {
            return (
                <div className="searchGameAdjustedPriceWrap">
                    <div className="searchGameDiscount">
                        -{parseFloat(content.discount_percentage) * 100}%
                    </div>
                    <div className="searchGamePriceTextWrap">
                        <p className="searchGamePriceStriked">
                            ${parseFloat(content.price).toFixed(2)}
                        </p>
                        <p className="searchGamePrice">
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
                <p className="searchGamePrice">
                    ${parseFloat(content.price).toFixed(2)}
                </p>
            );
        }
    };

    const renderChartGames = () => {
        let contentToRender = props.games.data?.games;
        if (queryValues.specials !== undefined) {
            contentToRender = props.discountedGames.data?.games;
        }
        if (contentToRender)
            return contentToRender.map((content, index) => {
                return (
                    <div
                        key={index}
                        className={`searchGameContainer ${
                            hoverData === content.game_id
                                ? "searchGameContainerToggled"
                                : ""
                        }`}
                        onClick={() => {
                            history.push(`game/${content.game_id}`);
                        }}
                        onMouseOver={() => {
                            setHoverData(content.game_id);
                        }}
                    >
                        <div className="searchGameImageAndTitleWrap">
                            <img
                                className={`searchGameImage searchGameImage${index}`}
                                src={content.cover_url}
                                onLoad={() => {
                                    anime({
                                        targets: `.searchGameImage${index}`,
                                        opacity: [
                                            {
                                                value: [0, 1],
                                                duration: 250,
                                                easing: "easeOutQuad",
                                            },
                                        ],
                                    });
                                }}
                                alt="game"
                            ></img>
                            <p className="searchGameTitle">{content.title}</p>
                        </div>

                        <div className="searchGameDateAndPriceWrap">
                            <p className="searchGameDate">
                                {moment(content.release_date).format(
                                    "YYYY/MM/DD"
                                )}
                            </p>
                            {renderPrice(content)}
                        </div>
                        {renderChartGamePreview(content.game_id)}
                    </div>
                );
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
        } else if (
            props.games.data?.games ||
            props.discountedGames.data?.games
        ) {
            if (
                props.games.data?.games.length === 0 ||
                props.discountedGames.data?.games.length === 0
            ) {
                return (
                    <React.Fragment>
                        <div className={`searchContainer`}>
                            <CartAndSearchbar />

                            <div className="searchColumnsWrap">
                                <div className="noResultsWrap">
                                    <p>There are no matches to your search. </p>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                );
            }
            return (
                <React.Fragment>
                    <div className={`searchContainer`}>
                        <CartAndSearchbar />
                        <div className="searchColumnsWrap">
                            <div className="searchGamesColumn">
                                {renderChartGames()}
                            </div>

                            {/* {renderChartGamePreview(hoverData)} */}
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <div className="loadingCenter">
                    <Loading />
                </div>
            );
        }
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
    fetchGamesByKeyword,
})(Search);
