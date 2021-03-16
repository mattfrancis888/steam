import React, { useEffect, useState } from "react";
import history from "../browserHistory";
import GameInfoCarousel from "./GameInfoCarousel";
import { games } from "./Home";
import WriteReview, { WriteReviewFormValues } from "./WriteReview";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
export interface WriteReviewFormProps {
    onSubmit(formValues: any): void;
    authStatus?: string | null;
    onRecommendorNot(response: boolean): void;
    recommend: boolean;
}

const GameInfo: React.FC<{}> = (props) => {
    const onSubmitRegister = async (formValues: WriteReviewFormValues) => {
        // props.signUp(formValues);
        console.log(formValues);
    };
    const [recommend, setRecommend] = useState(true);
    const onRecommendorNot = (response: boolean) => {
        if (response) setRecommend(true);
        else setRecommend(false);
    };

    return (
        <div className="gameInfoContainer">
            <h1 className="gameInfoTitle">
                The Elder Scrolls V: Skyrim Special Edition
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
                    {/* <GameInfoCarousel content={games} /> */}
                </div>
            </div>
            <WriteReview
                recommend={recommend}
                onRecommendorNot={onRecommendorNot}
                onSubmit={(formValues: any) => onSubmitRegister(formValues)}
            />
            <div className="gameInfoBuyContainer">
                <h1>Buy The Elder Scrolls V: Skyrim Special Edition </h1>
                <div className="gameInfoAddToCartWrap">
                    <div className="gameInfoPriceWrap">
                        <p className="gameInfoOrigPrice">18.99</p>
                        <p className="gameInfoadjustedPrice">16.99</p>
                    </div>
                    <button className="gameInfoAddToCartButton">
                        Add To Cart
                    </button>
                </div>
            </div>

            <h1 className="gameInfoSectionTitle">About This Game</h1>
            <p className="gameDescription">
                Winner of more than 200 Game of the Year Awards, Skyrim Special
                Edition brings the epic fantasy to life in stunning detail. The
                Special Edition includes the critically acclaimed game and
                add-ons with all-new features like remastered art and effects,
                volumetric god rays, dynamic depth of field, screen-space
                reflections, and more. Skyrim Special Edition also brings the
                full power of mods to the PC and consoles. New quests,
                environments, characters, dialogue, armor, weapons and more –
                with Mods, there are no limits to what you can experience.{" "}
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
                            <p className="reviewerVerdict">Recommended</p>
                        </div>
                        <p className="reviewerDesc">
                            With zero cost to play and one of the highest skill
                            ceilings of any game I've ever encountered.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameInfo;
