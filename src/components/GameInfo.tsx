import React, { useEffect, useState } from "react";
import history from "../browserHistory";
import GameInfoCarousel from "./GameInfoCarousel";
import WriteReview, { WriteReviewFormValues } from "./WriteReview";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { fetchGameInfo } from "../actions";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
import Loading from "./Loading";
import { ErrorStateResponse } from "reducers/errorReducer";
import { GameInfoStateResponse } from "reducers/gameInfoReducer";
export interface WriteReviewFormProps {
    onSubmit(formValues: any): void;
    authStatus?: string | null;
    onRecommendorNot(response: boolean): void;
    recommend: boolean;
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
                                src="https://cdn.akamai.steamstatic.com/steam/apps/489830/header.jpg?t=1590515887"
                                alt=""
                            ></img>
                            <div className="gameInfoShowcaseTextWrap">
                                <p>Release Date</p>
                                <p>Genres</p>
                            </div>
                        </div>
                        <div className="gameInfoShowcaseCarouselWrap">
                            <GameInfoCarousel
                                content={props.gameInfo.data.games}
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
                                {props.gameInfo.data.games[0].price && (
                                    <p className="gameInfoOrigPrice">
                                        {props.gameInfo.data.games[0].price}
                                    </p>
                                )}
                                <p className="gameInfoadjustedPrice">
                                    {
                                        props.gameInfo.data.games[0]
                                            .price_after_discount
                                    }
                                </p>
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
                        <div className="reviewBox">
                            <div className="reviewerInfoWrap">
                                <div className="reviewerAvatarWrap">
                                    <img
                                        src="https://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/f3/f3388a39be4329071367722dbf2754b83b05aab4_medium.jpg"
                                        alt="avatar"
                                    ></img>
                                </div>
                                <p className="reviewerUsername">
                                    usernameusernameusernameusername
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
                        </div>
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
