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
        </div>
    );
};

export default Home;
