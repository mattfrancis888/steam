import React, { useEffect, useState } from "react";
import history from "../browserHistory";
import GameInfoCarousel from "./GameInfoCarousel";
import WriteReview, { WriteReviewFormValues } from "./WriteReview";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { fetchGameInfo, Game, Reviewer } from "../actions";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
import Loading from "./Loading";
import { ErrorStateResponse } from "reducers/errorReducer";
import { GameInfoStateResponse } from "reducers/gameInfoReducer";
import defaultAvatar from "../img/defaultAvatar.png";
import anime from "animejs/lib/anime.es.js";
import moment from "moment";
export interface WriteReviewFormProps {
    onSubmit(formValues: any): void;
    authStatus?: string | null;
    onRecommendorNot(response: boolean): void;
    recommend: boolean;
}

export interface GameInfoCarouselProps {
    screenshots: string[];
}
interface GameInfoProps {
    fetchGameInfo(gameId: number): void;
    errors: ErrorStateResponse;
    gameInfo: GameInfoStateResponse;
    match: any;
}

const GameInfo: React.FC<GameInfoProps> = (props) => {
    useEffect(() => {
        props.fetchGameInfo(props.match.params.gameId);
    }, []);

    const renderPrice = (game: Game) => {
        if (game.discount_percentage) {
            return (
                <div className="gameInfoAdjustedPriceWrap">
                    <div className="gameInfoDiscount">
                        -{parseFloat(game.discount_percentage) * 100}%
                    </div>
                    <div>
                        <p className="gameInfoOrigPriceStriked">
                            ${parseFloat(game.price).toFixed(2)}
                        </p>
                        <p className="gameInfoPrice">
                            ${parseFloat(game.price_after_discount).toFixed(2)}
                        </p>
                    </div>
                </div>
            );
        } else {
            //no discount
            return (
                <p className="chartGamePrice">
                    ${parseFloat(game.price).toFixed(2)}
                </p>
            );
        }
    };

    const renderThumbIconForReview = (recommend: boolean) => {
        if (recommend) {
            return (
                <React.Fragment>
                    <FiThumbsUp className="reviewerThumbIcon" />
                    <p className="reviewerVerdict">Recommended</p>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <FiThumbsDown className="reviewerThumbIcon" />
                    <p className="reviewerVerdict">Not Recommended</p>
                </React.Fragment>
            );
        }
    };

    const renderReviews = (reviews: Reviewer[]) => {
        return reviews.map((review, index) => {
            return (
                <div className="reviewBox">
                    <div className="reviewerInfoWrap">
                        <div className="reviewerAvatarWrap">
                            <img
                                src={
                                    review.avatar_url
                                        ? review.avatar_url
                                        : defaultAvatar
                                }
                                alt="avatar"
                                onError={(e: any) => {
                                    e.target.src = defaultAvatar; // some replacement image
                                    // e.target.style = 'padding: 8px; margin: 16px' // inline styles in html format
                                }}
                            ></img>
                        </div>
                        <p className="reviewerUsername">{review.username}</p>
                    </div>
                    <div className="reviewerReviewWrap">
                        <div className="reviewerVerdictWrap">
                            {renderThumbIconForReview(review.recommend)}
                        </div>
                        <p className="reviewerDesc">{review.opinion}</p>
                    </div>
                </div>
            );
        });
    };

    const onSubmitRegister = async (formValues: WriteReviewFormValues) => {
        // props.signUp(formValues);
        console.log(formValues);
    };
    const [recommend, setRecommend] = useState(true);
    const onRecommendorNot = (response: boolean) => {
        if (response) setRecommend(true);
        else setRecommend(false);
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
        } else if (props.gameInfo.data) {
            return (
                <div className="gameInfoContainer">
                    <h1 className="gameInfoTitle">
                        {props.gameInfo.data.games[0].title}
                    </h1>
                    <div className="gameInfoShowcaseContainer">
                        <div className="gameInfoShowcasePreviewWrap">
                            <img
                                className="gameInfoShowcaseTitleImage"
                                src={props.gameInfo.data.games[0].cover_url}
                                alt=""
                                onLoad={() => {
                                    anime({
                                        targets: `.gameInfoShowcaseTitleImage`,
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
                            ></img>
                            <div className="gameInfoShowcaseTextWrap">
                                <p className="showcaseAbout">
                                    {props.gameInfo.data.games[0].about}
                                </p>
                                <p className="releaseDate">
                                    {`Release Date -  ${moment(
                                        props.gameInfo.data.games[0]
                                            .release_date
                                    ).format("YYYY/MM/DD")}`}
                                </p>
                                <div className="gameInfoGenresWrap">
                                    {props.gameInfo.data.games[0].genres.map(
                                        (genre, index) => {
                                            return (
                                                <p
                                                    key={index}
                                                    className="gameInfoGenreTag"
                                                >
                                                    {genre}
                                                </p>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="gameInfoShowcaseCarouselWrap">
                            <GameInfoCarousel
                                screenshots={
                                    props.gameInfo.data.games[0].screenshots
                                }
                            />
                        </div>
                    </div>
                    <WriteReview
                        recommend={recommend}
                        onRecommendorNot={onRecommendorNot}
                        onSubmit={(formValues: any) =>
                            onSubmitRegister(formValues)
                        }
                    />
                    <div className="gameInfoBuyContainer">
                        <h1>Buy {props.gameInfo.data.games[0].title}</h1>
                        <div className="gameInfoAddToCartWrap">
                            <div className="gameInfoPriceWrap">
                                {renderPrice(props.gameInfo.data.games[0])}
                            </div>
                            <button className="gameInfoAddToCartButton">
                                Add To Cart
                            </button>
                        </div>
                    </div>

                    <h1 className="gameInfoSectionTitle">About This Game</h1>
                    <p className="gameDescription">
                        {props.gameInfo.data.games[0].about}
                    </p>

                    <h1 className="gameInfoSectionTitle">Recent Reviews</h1>
                    <div className="reviewsContainer">
                        {/* <div className="reviewBox">
                            <div className="reviewerInfoWrap">
                                <div className="reviewerAvatarWrap">
                                    <img
                                        src="https://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/f3/f3388a39be4329071367722dbf2754b83b05aab4_medium.jpg"
                                        alt="avatar"
                                    ></img>
                                </div>
                                <p className="reviewerUsername">
                                    {
                                        props.gameInfo.data.games[0].reviews[0]
                                            .username
                                    }
                                </p>
                            </div>
                            <div className="reviewerReviewWrap">
                                <div className="reviewerVerdictWrap">
                                    <FiThumbsUp className="reviewerThumbIcon" />
                                    <p className="reviewerVerdict">
                                        Recommended
                                    </p>
                                </div>
                                <p className="reviewerDesc">
                                    With zero cost to play and one of the
                                    highest skill ceilings of any game I've ever
                                    encountered.
                                </p>
                            </div>
                        </div> */}
                        {renderReviews(props.gameInfo.data.games[0].reviews)}
                    </div>
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
        gameInfo: state.gameInfo,
        errors: state.errors,
    };
};

export default connect(mapStateToProps, {
    fetchGameInfo,
})(GameInfo);
