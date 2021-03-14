import React from "react";
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
        image:
            "https://cdn.cloudflare.steamstatic.com/steam/apps/1222730/header.jpg?t=1614938362",
    },
    {
        image:
            "https://cdn.cloudflare.steamstatic.com/steam/apps/1222730/header.jpg?t=1614938362",
    },
    {
        image:
            "https://cdn.cloudflare.steamstatic.com/steam/apps/1222730/header.jpg?t=1614938362",
    },
    {
        image:
            "https://cdn.cloudflare.steamstatic.com/steam/apps/1222730/header.jpg?t=1614938362",
    },
    {
        image:
            "https://cdn.cloudflare.steamstatic.com/steam/apps/1222730/header.jpg?t=1614938362",
    },
    {
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

const Home: React.FC<{}> = () => {
    return (
        <div className="homeContainer">
            <h1 className="bannerTitle">Featured And Recommended</h1>
            <FeaturedCarousel content={games} />
            <h1 className="bannerTitle">Special Offers</h1>
            <SpecialOfferCarousel content={specialOfferGames} />
            <h1 className="bannerTitle">The Community Recomends</h1>
            <CommunityCarousel content={games} />

            <div className="chart">
                {specialOfferGames.map((content, index) => {
                    return (
                        <div className="chartGameContainer">
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
                                <p className="chartPrice">$49.99</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
