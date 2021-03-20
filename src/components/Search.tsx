import React, { useEffect, useState, useRef } from "react";
import { fetchGames, fetchDiscountedGames, Game } from "../actions";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
import { GamesStateResponse } from "../reducers/gamesReducer";
import { ErrorStateResponse } from "reducers/errorReducer";
import Loading from "./Loading";
import history from "../browserHistory";
import moment from "moment";
import _ from "lodash";
interface SearchProps {
    games: GamesStateResponse;
    discountedGames: GamesStateResponse;
    errors: ErrorStateResponse;
    fetchGames(): void;
    fetchDiscountedGames(): void;
}

const Search: React.FC<SearchProps> = (props) => {
    useEffect(() => {
        props.fetchGames();
        // props.fetchDiscountedGames();
    }, []);

    const [hoverData, setHoverData] = useState(1);

    const renderScreenshotsForGame = (gameId: number) => {
        let game = _.filter(props.games.data?.games, {
            game_id: gameId,
        });
        let maxScreenshotToShow = 1;
        return game[0].screenshots.map((screenshot, index) => {
            if (index < maxScreenshotToShow)
                return <img key={index} src={screenshot} alt="preview"></img>;
        });
    };

    const renderGenresForGameText = (gameId: number) => {
        let filteredContent = _.filter(props.games.data?.games, {
            game_id: gameId,
        });

        return filteredContent.map((content, index) => {
            return content.genres.map((genre, index) => {
                return <p className="searchGameGenres">{genre}</p>;
            });
        });
    };

    const renderChartGamePreview = (gameId: number) => {
        let filteredContent = _.filter(props.games.data?.games, {
            game_id: gameId,
        });

        return (
            <div className="searchPreviewHover">
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
                <React.Fragment>
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
                </React.Fragment>
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
        // if (specialsTabClicked === true) {
        //     contentToRender = props.discountedGames.data?.games;
        // }
        if (contentToRender)
            return contentToRender.map((content, index) => {
                return (
                    <div
                        key={index}
                        // className={`searchGame  ${
                        //     hoverData === content.game_id
                        //         ? "searchGameContainerToggled"
                        //         : ""
                        // }`}
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
                            <img src={content.cover_url} alt="game"></img>
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
        } else if (props.games.data) {
            return (
                <div className={`searchContainer`}>
                    <div className="searchGamesColumn">
                        {renderChartGames()}
                    </div>

                    {renderChartGamePreview(hoverData)}
                </div>
            );
        } else {
            return <Loading />;
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
})(Search);
