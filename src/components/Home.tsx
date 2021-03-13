import React from "react";
import { Router } from "react-router-dom";
import history from "../browserHistory";
import Routes from "./Routes";
import FeaturedCarousel from "./FeaturedCarousel";
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

interface Game {
    image: string;
}
export interface FeaturedCarouselProps {
    content: Game[];
}
const Home: React.FC<{}> = () => {
    return (
        <div className="homeContainer">
            <h1 className="bannerTitle">Featured And Recommended</h1>
            <FeaturedCarousel content={games} />
        </div>
    );
};

export default Home;
