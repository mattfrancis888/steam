import React, { useEffect, useState, useRef } from "react";
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
import history from "../browserHistory";
import useWindowDimensions from "../windowDimensions";
import { FeaturedCarouselProps } from "./Home";
import anime from "animejs/lib/anime.es.js";
import { LG_SCREEN_SIZE, MED_SCREEN_SIZE } from "../constants";
import { Game } from "../actions";
import _ from "lodash";

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = (props) => {
    const { width } = useWindowDimensions();
    const [displayImage, setDisplayImage] = useState("");
    const [autoPlay, setAutoPlay] = useState(false);

    const renderPrice = (content: Game) => {
        if (parseFloat(content.discount_percentage) > 0) {
            return (
                <div className="featuredAdjustedPriceWrap">
                    <div className="featuredDiscount">
                        <p>-{parseFloat(content.discount_percentage) * 100}%</p>
                    </div>
                    <div className="featuredPriceStrikedAndPriceWrap">
                        <p className="featuredOrigPriceStriked">
                            ${parseFloat(content.price).toFixed(2)}
                        </p>
                        <p className="featuredGamePrice">
                            $
                            {parseFloat(content.price_after_discount).toFixed(
                                2
                            )}
                        </p>
                    </div>
                </div>
            );
        } else {
            //no discount
            return (
                <div className="featuredGamePriceInnerWrap">
                    <p className="featuredGamePrice">
                        ${parseFloat(content.price).toFixed(2)}
                    </p>
                </div>
            );
        }
    };

    //Duplicate of the one in Home, just in case we want to customize it
    const renderScreenshotsForGame = (gameId: number) => {
        let gameForSlide = _.filter(props.content, {
            game_id: gameId,
        });
        let maxScreenshotToShow = 4;
        if (gameForSlide.length > 0)
            return gameForSlide[0].screenshots.map((screenshot, index) => {
                if (index < maxScreenshotToShow)
                    return (
                        <img
                            key={index}
                            src={screenshot}
                            onMouseEnter={(e) => {
                                setDisplayImage(screenshot);
                            }}
                            onMouseLeave={(e) => {
                                setDisplayImage("");
                            }}
                            alt="preview"
                        ></img>
                    );
            });
    };

    const renderSlides = () => {
        return props.content.map((content, index) => {
            return (
                <Slide
                    index={index}
                    key={index}
                    onClick={() => {
                        history.push(`game/${content.game_id}`);
                    }}
                    className="test"
                >
                    {/* <LazyLoad> */}
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
                                        duration: 0,
                                        easing: "easeOutQuad",
                                    },
                                ],
                            });
                        }}
                    >
                        <div className="featuredCarouselSectionWrap">
                            <div className="featuredCarouselImageSection">
                                <img
                                    // src={content.cover_url}
                                    src={
                                        displayImage === ""
                                            ? content.cover_url
                                            : displayImage
                                    }
                                    alt="game cover"
                                ></img>
                                <div className="featuredCarouselGamePrice">
                                    {renderPrice(content)}
                                </div>
                            </div>
                            <div className="featuredCarouselScreenshotSection">
                                <h1 className="featuredCarouselGameTitle">
                                    {content.title}
                                </h1>
                                <div className="featuredCarouselGameScreenshotsWrap">
                                    {renderScreenshotsForGame(content.game_id)}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </LazyLoad> */}
                </Slide>
            );
        });
    };

    const renderCarousel = (): JSX.Element | JSX.Element[] => {
        return (
            <div
                onMouseEnter={(e) => {
                    setAutoPlay(false);
                }}
                onMouseLeave={(e) => {
                    setAutoPlay(true);
                }}
            >
                <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={width < LG_SCREEN_SIZE ? 45 : 31}
                    // totalSlides={props.content.length}
                    totalSlides={props.content.length}
                    className="gameCarouselWrap"
                    visibleSlides={1}
                    infinite={true}
                    step={1}
                    // isPlaying={autoPlay}
                    isPlaying={false}
                    interval={2000}
                >
                    <div className="sliderAndButtonWrap">
                        <Slider>{renderSlides()}</Slider>

                        <ButtonBack
                            className={`gameBackButton ${
                                width < LG_SCREEN_SIZE
                                    ? "hideFeaturedCarouselButton"
                                    : ""
                            }`}
                            onClick={(index) => {
                                setDisplayImage("");
                            }}
                        >
                            <RiArrowLeftSLine />
                        </ButtonBack>

                        <ButtonNext
                            className={`gameNextButton ${
                                width < LG_SCREEN_SIZE
                                    ? "hideFeaturedCarouselButton"
                                    : ""
                            }`}
                            onClick={(index) => {
                                setDisplayImage("");
                            }}
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
                            <ButtonBack className="gameBackButton">
                                <RiArrowLeftSLine />
                            </ButtonBack>
                            <ButtonNext className="gameNextButton">
                                <RiArrowRightSLine />
                            </ButtonNext>
                        </div>
                    </div>
                    <div
                        className={`carouselDotGroupWrap ${
                            width < LG_SCREEN_SIZE ? "hideCarouselDotGroup" : ""
                        }`}
                    >
                        <DotGroup></DotGroup>
                    </div>
                </CarouselProvider>
            </div>
        );
    };

    return <div>{renderCarousel()}</div>;
};

export default FeaturedCarousel;
