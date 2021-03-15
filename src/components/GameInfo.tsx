import React, { useEffect } from "react";
import history from "../browserHistory";
import GameInfoCarousel from "./GameInfoCarousel";
import { games } from "./Home";
import WriteReview, { EmailAndPasswordFormValues } from "./WriteReview";

export interface RegisterFormProps {
    onSubmit(formValues: any): void;
    authStatus?: string | null;
}

const GameInfo: React.FC<{}> = (props) => {
    const onSubmitRegister = async (formValues: EmailAndPasswordFormValues) => {
        // props.signUp(formValues);
        console.log(formValues);
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
                    <GameInfoCarousel content={games} />
                </div>
            </div>
            <WriteReview
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

            <h1 className="aboutThisGame">About This Game</h1>
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
        </div>
    );
};

export default GameInfo;
