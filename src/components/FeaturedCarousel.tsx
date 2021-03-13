import React, { useEffect, useState } from "react";
import {
    CarouselProvider,
    Slider,
    Slide,
    ButtonBack,
    ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";
import useWindowDimensions from "../windowDimensions";
import { FeaturedCarouselProps } from "./Home";
import anime from "animejs/lib/anime.es.js";
import { LG_SCREEN_SIZE, MED_SCREEN_SIZE } from "../constants";
const FeaturedCarousel: React.FC<FeaturedCarouselProps> = (props) => {
    const history = useHistory();
    const { width } = useWindowDimensions();
    const [style, setStyle] = useState({ opacity: "1" });

    const renderSlides = () => {
        return props.content.map((content, index) => {
            return (
                <Slide index={index} key={index}>
                    <LazyLoad>
                        <div
                            className={`featuredContainerCarousel featuredAnime${index}`}
                            onLoad={() => {
                                anime({
                                    targets: `.featuredAnime${index}`,
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
                        >
                            <div className="featuredCarouselSectionWrap">
                                <div className="featuredCarouselImageSection">
                                    <img
                                        src={content.image}
                                        alt="movie poster"
                                    ></img>
                                </div>
                                <div className="featuredCarouselScreenshotSection">
                                    <h1 className="featuredCarouselGameTitle">
                                        Game TItle
                                    </h1>
                                    <div className="featuredCarouselGameScreenshotsWrap">
                                        <img
                                            src={content.image}
                                            alt="game screenshot"
                                        ></img>
                                        <img
                                            src={content.image}
                                            alt="game screenshot"
                                        ></img>
                                        <img
                                            src={content.image}
                                            alt="game screenshot"
                                        ></img>
                                        <img
                                            src={content.image}
                                            alt="game screenshot"
                                        ></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </LazyLoad>
                </Slide>
            );
        });
    };

    const renderCarousel = (): JSX.Element | JSX.Element[] => {
        return (
            <div
                onMouseEnter={(e) => {
                    // setStyle({ opacity: "1" });
                }}
                onMouseLeave={(e) => {
                    // setStyle({ opacity: "0" });
                }}
            >
                <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={width < LG_SCREEN_SIZE ? 55 : 33}
                    totalSlides={props.content.length}
                    className="mediaCarouselWrap"
                    visibleSlides={1}
                    infinite={props.content.length < 3 ? false : true}
                    step={3}
                >
                    <div className="sliderAndButtonWrap">
                        <Slider>{renderSlides()}</Slider>

                        <ButtonBack
                            className={`mediaBackButton ${
                                width < LG_SCREEN_SIZE
                                    ? "hideFeaturedCarouselButton"
                                    : ""
                            }`}
                        >
                            <RiArrowLeftSLine />
                        </ButtonBack>
                        <ButtonNext
                            className={`mediaNextButton ${
                                width < LG_SCREEN_SIZE
                                    ? "hideFeaturedCarouselButton"
                                    : ""
                            }`}
                        >
                            <RiArrowRightSLine />
                        </ButtonNext>

                        <div
                            className={`showButtonsForSmallScreensWrap ${
                                width > LG_SCREEN_SIZE
                                    ? "hideFeaturedCarouselButtonsWrap"
                                    : ""
                            }`}
                        >
                            <ButtonBack className="mediaBackButton">
                                <RiArrowLeftSLine />
                            </ButtonBack>
                            <ButtonNext className="mediaNextButton">
                                <RiArrowRightSLine />
                            </ButtonNext>
                        </div>
                    </div>
                </CarouselProvider>
            </div>
        );
    };

    return <div>{renderCarousel()}</div>;
};

export default FeaturedCarousel;
