import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
    CarouselProvider,
    Slider,
    Slide,
    DotGroup,
    ButtonBack,
    ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";
import useWindowDimensions from "../windowDimensions";
import Home, { FeaturedCarouselProps } from "./Home";
import anime from "animejs/lib/anime.es.js";
import { LG_SCREEN_SIZE, MED_SCREEN_SIZE } from "../constants";

const GameInfoCarousel: React.FC<FeaturedCarouselProps> = (props) => {
    const { width } = useWindowDimensions();
    const [displayImage, setDisplayImage] = useState(
        props.content[0].cover_url
    );

    const renderSlides = () => {
        return props.content.map((content, index) => {
            return (
                <Slide index={index} key={index}>
                    <LazyLoad>
                        <div
                            className={`gameInfoContainerCarousel gameInfoAnime${index}`}
                            onLoad={() => {
                                anime({
                                    targets: `.gameInfoAnime${index}`,
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
                            onClick={(event) => {
                                console.log(content.cover_url);
                                setDisplayImage(content.cover_url);
                            }}
                        >
                            <div className="gameInfoCarouselScreenshots">
                                <img src={content.cover_url} alt="screenshot" />
                                {/* <img
                                    src="https://cdn.akamai.steamstatic.com/steam/apps/489830/ss_921ccea650df936a0b14ebd5dd4ecc73c1d2a12d.600x338.jpg?t=1590515887"
                                    alt="screenshot"
                                />
                                <img
                                    src="https://cdn.akamai.steamstatic.com/steam/apps/489830/ss_921ccea650df936a0b14ebd5dd4ecc73c1d2a12d.600x338.jpg?t=1590515887"
                                    alt="screenshot"
                                />
                                <img
                                    src="https://cdn.akamai.steamstatic.com/steam/apps/489830/ss_921ccea650df936a0b14ebd5dd4ecc73c1d2a12d.600x338.jpg?t=1590515887"
                                    alt="screenshot"
                                /> */}
                            </div>
                        </div>
                    </LazyLoad>
                </Slide>
            );
        });
    };

    const renderCarousel = (): JSX.Element | JSX.Element[] => {
        return (
            <div>
                <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={width < LG_SCREEN_SIZE ? 55 : 43}
                    totalSlides={props.content.length}
                    className="gameCarouselWrap"
                    visibleSlides={4}
                    infinite={true}
                    step={1}
                >
                    <div className="sliderAndButtonWrap">
                        <Slider>{renderSlides()}</Slider>

                        <div className={`showButtonsForSmallScreensWrap`}>
                            <ButtonBack className="gameBackButton">
                                <RiArrowLeftSLine />
                            </ButtonBack>
                            <ButtonNext className="gameNextButton">
                                <RiArrowRightSLine />
                            </ButtonNext>
                        </div>
                    </div>
                </CarouselProvider>
            </div>
        );
    };

    return (
        <div>
            <img
                className="gameInfoDisplayImag"
                src={displayImage}
                alt="game"
            ></img>
            {renderCarousel()}
        </div>
    );
};

export default GameInfoCarousel;
