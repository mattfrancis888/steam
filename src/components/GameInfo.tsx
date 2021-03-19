import React, { useEffect, useState, useRef } from "react";
import history from "../browserHistory";
import GameInfoCarousel from "./GameInfoCarousel";
import WriteReview, { WriteReviewFormValues } from "./WriteReview";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import {
    fetchGameInfo,
    Game,
    Reviewer,
    fetchGameInfoReviews,
    postReview,
    editReview,
} from "../actions";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
import Loading from "./Loading";
import { ErrorStateResponse } from "reducers/errorReducer";
import { GameInfoStateResponse } from "reducers/gameInfoReducer";
import defaultAvatar from "../img/defaultAvatar.png";
import anime from "animejs/lib/anime.es.js";
import moment from "moment";
import { GameInfoReviewsStateResponse } from "reducers/gameInfoReviewsReducer";
import _ from "lodash";
import EditReview from "./EditReview";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
export interface WriteReviewFormProps {
    onSubmit(formValues: any): void;
    authStatus?: string | null;
    onRecommendorNot(response: boolean): void;
    recommend: boolean;
}

export interface EditReviewFormProps {
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
    fetchGameInfoReviews(gameId: number): void;
    postReview(formValues: IPostAndEditReview, gameId: number): void;
    editReview(formValues: IPostAndEditReview, gameId: number): void;
    errors: ErrorStateResponse;
    gameInfo: GameInfoStateResponse;
    gameInfoReviews: GameInfoReviewsStateResponse;
    match: any;
}

export interface IPostAndEditReview {
    opinion: string;
    recommend: boolean;
}
const GameInfo: React.FC<GameInfoProps> = (props) => {
    const itemEls = useRef(new Array());
    //Using refs when you have a dynamic list: https://mattclaffey.medium.com/adding-react-refs-to-an-array-of-items-96e9a12ab40c
    //normal [] would not wrok.
    useEffect(() => {
        props.fetchGameInfo(props.match.params.gameId);
        props.fetchGameInfoReviews(props.match.params.gameId);
    }, []);
    useEffect(() => {
        //This is used for to control thumbs up or thumbs down button
        if (props.gameInfoReviews.data) {
            if (Cookies.get("ACCESS_TOKEN")) {
                //If user is signed in
                //@ts-ignore
                const email = jwt_decode(Cookies.get("ACCESS_TOKEN")).subject;
                const filteredContent = _.filter(
                    props.gameInfoReviews.data?.reviews,
                    {
                        email: email,
                    }
                );
                if (filteredContent.length > 0) {
                    //@ts-ignore
                    setRecommend(filteredContent[0].recommend);
                }
            }
        }
        console.log(itemEls.current);
        // itemEls.current[0]?.scrollIntoView({ behavior: "smooth" });
    }, [props.gameInfoReviews.data]);
    const [recommend, setRecommend] = useState(true);

    const onRecommendorNot = (response: boolean) => {
        if (response) setRecommend(true);
        else setRecommend(false);
    };

    const renderWriteReview = () => {
        if (Cookies.get("ACCESS_TOKEN")) {
            //If user is signed in
            //@ts-ignore
            const email = jwt_decode(Cookies.get("ACCESS_TOKEN")).subject;

            const filteredContent = _.filter(
                props.gameInfoReviews.data?.reviews,
                {
                    email: email,
                }
            );
            //If user already wrote a review,
            if (filteredContent.length > 0) {
                return null;
            }
        } else {
            //If user is not signed in
            return (
                <WriteReview
                    recommend={recommend}
                    onRecommendorNot={onRecommendorNot}
                    onSubmit={(formValues: any) =>
                        onSubmitPostReview(formValues)
                    }
                />
            );
        }
    };

    const renderEditReview = () => {
        if (Cookies.get("ACCESS_TOKEN")) {
            //If user is signed in
            //@ts-ignore
            const email = jwt_decode(Cookies.get("ACCESS_TOKEN")).subject;
            const filteredContent = _.filter(
                props.gameInfoReviews.data?.reviews,
                {
                    email: email,
                }
            );

            //If user already wrote a review
            if (filteredContent.length > 0) {
                return (
                    <EditReview
                        recommend={recommend}
                        onRecommendorNot={onRecommendorNot}
                        onSubmit={(formValues: any) =>
                            onSubmitEditReview(formValues)
                        }
                        initialValues={{
                            //@ts-ignore  typescript has issues with lodash's ._filter because they use flat array
                            opinion: filteredContent[0].opinion,
                        }}
                    />
                );
            }
        }
    };

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
                <div
                    key={index}
                    className="reviewBox"
                    ref={(element) =>
                        index === 0 ? (itemEls.current[index] = element) : null
                    }
                >
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
                        <p className="reviewerUsername">
                            {review.username
                                ? review.username
                                : `Anonymous User`}
                        </p>
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

    const onSubmitPostReview = async (formValues: WriteReviewFormValues) => {
        const recommendObj = { recommend: recommend };
        const updatedObj: IPostAndEditReview = Object.assign(
            formValues,
            recommendObj
        );
        props.postReview(updatedObj, props.match.params.gameId);
        itemEls.current[0]?.scrollIntoView({ behavior: "smooth" });
    };

    const onSubmitEditReview = async (formValues: WriteReviewFormValues) => {
        const recommendObj = { recommend: recommend };
        const updatedObj: IPostAndEditReview = Object.assign(
            formValues,
            recommendObj
        );
        props.editReview(updatedObj, props.match.params.gameId);
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
        } else if (props.gameInfo.data && props.gameInfoReviews.data) {
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

                    {renderWriteReview()}
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
                    {renderEditReview()}
                    <div className="reviewsContainer">
                        {renderReviews(props.gameInfoReviews.data.reviews)}
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
        gameInfoReviews: state.gameInfoReviews,
        errors: state.errors,
    };
};

export default connect(mapStateToProps, {
    fetchGameInfo,
    fetchGameInfoReviews,
    postReview,
    editReview,
})(GameInfo);
