import React, { useState, useEffect } from "react";
import { Router } from "react-router-dom";
import history from "../browserHistory";
import Routes from "./Routes";
import FeaturedCarousel from "./FeaturedCarousel";
import SpecialOfferCarousel from "./SpecialOfferCarousel";
import CommunityCarousel from "./CommunityCarousel";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchGames, fetchDiscountedGames, Game } from "../actions";
import { StoreState } from "../reducers";
import { GamesStateResponse } from "../reducers/gamesReducer";
import { ErrorStateResponse } from "reducers/errorReducer";
import { LG_SCREEN_SIZE, MED_SCREEN_SIZE } from "../constants";
import Loading from "./Loading";
import useWindowDimensions from "../windowDimensions";

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
    const [hoverData, setHoverData] = useState(1);
    const [specialsTabClicked, setSpecialsTabClicked] = useState(false);
    useEffect(() => {
        props.fetchGames();
        props.fetchDiscountedGames();
    }, []);

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
        let game = _.filter(props.games.data?.games, {
            game_id: gameId,
        });
        let maxScreenshotToShow = 4;
        return game[0].screenshots.map((screenshot, index) => {
            if (index < maxScreenshotToShow)
                return <img key={index} src={screenshot} alt="preview"></img>;
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

    const renderChartGames = () => {
        let contentToRender = props.games.data?.games;
        if (specialsTabClicked === true) {
            contentToRender = props.discountedGames.data?.games;
        }
        if (contentToRender)
            return contentToRender.map((content, index) => {
                return (
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
                            <img src={content.cover_url} alt="game"></img>
                        </div>
                        <div className="chartGameInfo">
                            <div className="chartGameGenreAndTitle">
                                <p className="chartGameTitle">
                                    {content.title}
                                </p>
                                <p className="chartGameGenres">
                                    {renderGenresForGameText(content.game_id)}
                                </p>
                            </div>
                            {renderPrice(content)}
                        </div>
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
        } else if (props.games.data && props.discountedGames.data) {
            return (
                <div className="homeContainer">
                    <div className="homeFirstSection">
                        <h1 className="bannerTitle">
                            Featured And Recommended
                        </h1>
                        <FeaturedCarousel content={props.games.data.games} />
                        <h1 className="bannerTitle">Special Offers</h1>
                        <SpecialOfferCarousel
                            content={props.discountedGames.data.games}
                        />
                        <h1 className="bannerTitle">
                            The Community Recommends
                        </h1>
                        <CommunityCarousel content={props.games.data.games} />
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
                            {renderChartGames()}
                        </div>
                        {renderChartGamePreview(hoverData)}
                    </div>
                </div>
            );
        } else {
            return <Loading />;
        }
    };

    const renderChartGamePreview = (gameId: number) => {
        let filteredContent = _.filter(props.games.data?.games, {
            game_id: gameId,
        });

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
