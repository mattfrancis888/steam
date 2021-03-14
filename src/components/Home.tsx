import React, { useState, useEffect } from "react";
import { Router } from "react-router-dom";
import history from "../browserHistory";
import Routes from "./Routes";
import FeaturedCarousel from "./FeaturedCarousel";
import SpecialOfferCarousel from "./SpecialOfferCarousel";
import CommunityCarousel from "./CommunityCarousel";
import _ from "lodash";
const games = [
    {
        image:
            "https://cdn.akamai.steamstatic.com/steam/apps/1086940/capsule_616x353.jpg?t=1614870777",
    },
    {
        image:
            "https://cdn.akamai.steamstatic.com/steam/apps/1086940/capsule_616x353.jpg?t=1614870777",
    },
];

const specialOfferGames = [
    {
        id: 1,
        image:
            "https://cdn.cloudflare.steamstatic.com/steam/apps/1222730/header.jpg?t=1614938362",
    },
    {
        id: 2,
        image:
            "https://cdn.cloudflare.steamstatic.com/steam/apps/1222730/header.jpg?t=1614938362",
    },
    {
        id: 3,
        image:
            "https://cdn.cloudflare.steamstatic.com/steam/apps/1222730/header.jpg?t=1614938362",
    },
    {
        id: 4,
        image:
            "https://cdn.cloudflare.steamstatic.com/steam/apps/1222730/header.jpg?t=1614938362",
    },
    {
        id: 5,
        image:
            "https://cdn.cloudflare.steamstatic.com/steam/apps/1222730/header.jpg?t=1614938362",
    },
    {
        id: 6,
        image:
            "https://cdn.cloudflare.steamstatic.com/steam/apps/1222730/header.jpg?t=1614938362",
    },
];

export interface Game {
    image: string;
}
export interface FeaturedCarouselProps {
    content: Game[];
}
export interface SpecialOfferCarouselProps {
    content: Game[];
}

const Home: React.FC<{}> = (props) => {
    const [hoverData, setHoverData] = useState(1);

    const renderChartGamePreview = (index: number) => {
        if (hoverData === index) {
            return (
                <div className="chartGamePreviewHover">
                    <p className="chartGamePreviewTitle">Game Title</p>
                    <div className="chartGamePreviewGenresWrap">
                        <p className="chartGamePreviewGenres">Genres</p>
                    </div>
                    <div className="chartGamePreviewScreenshots">
                        <img
                            src="https://cdn.cloudflare.steamstatic.com/steam/apps/1282730/ss_455789884ed94fd20410ac5a139e8c3bb8f6f369.600x338.jpg"
                            alt="preview"
                        ></img>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    };
    return (
        <div className="homeContainer">
            <div className="homeFirstSection">
                <h1 className="bannerTitle">Featured And Recommended</h1>
                <FeaturedCarousel content={games} />
                <h1 className="bannerTitle">Special Offers</h1>
                <SpecialOfferCarousel content={specialOfferGames} />
                <h1 className="bannerTitle">The Community Recomends</h1>
                <CommunityCarousel content={games} />
            </div>
            <div className="chartTabsWrap">
                <div className="chartTab">Top Sellers</div>
                <div className="chartTab">Specials</div>
            </div>

            <div className="chart">
                {specialOfferGames.map((content, index) => {
                    return (
                        <div
                            className="chartGameContainer"
                            onMouseOver={() => setHoverData(content.id)}
                            // onMouseOut={() => setHoverData(-1)}
                        >
                            <div className="chartGameImage">
                                <img
                                    src="https://cdn.cloudflare.steamstatic.com/steam/apps/412020/capsule_184x69.jpg?t=1614093928"
                                    alt="game"
                                ></img>
                            </div>
                            <div className="chartGameInfo">
                                <div className="chartGameGenreAndTitle">
                                    <p className="chartGameTitle">Game Title</p>
                                    <p className="chartGameGenres">Genres</p>
                                </div>
                                <p className="chartGamePrice">$49.99</p>
                            </div>
                            {renderChartGamePreview(content.id)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
