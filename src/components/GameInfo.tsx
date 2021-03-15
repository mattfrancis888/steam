import React, { useEffect } from "react";
import history from "../browserHistory";
import GameInfoCarousel from "./GameInfoCarousel";
import { games } from "./Home";
const GameInfo: React.FC<{}> = (props) => {
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
        </div>
    );
};

export default GameInfo;
