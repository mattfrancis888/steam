import React, { useEffect, useState } from "react";
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
import { FeaturedCarouselProps } from "./Home";
import anime from "animejs/lib/anime.es.js";
import { LG_SCREEN_SIZE, MED_SCREEN_SIZE } from "../constants";
import { Game } from "../actions";
import _ from "lodash";

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = (props) => {
    const { width } = useWindowDimensions();

    const renderPrice = (content: Game) => {
        if (content.discount_percentage) {
            return (
                <div className="featuredAdjustedPriceWrap">
                    <div className="featuredDiscount">
                        -{parseFloat(content.discount_percentage) * 100}%
                    </div>
                    <div>
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
                <p className="chartGamePrice">
                    ${parseFloat(content.price).toFixed(2)}
                </p>
            );
        }
    };

    //Duplicate of the one in Home, just in case we want to customize it
    const renderScreenshotsForGame = (gameId: number) => {
        let gameForSlide = _.filter(props.content, {
            game_id: gameId,
        });
        let maxScreenshotToShow = 4;
        return gameForSlide[0].screenshots.map((screenshot, index) => {
            if (index < maxScreenshotToShow)
                return <img key={index} src={screenshot} alt="preview"></img>;
        });
    };

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
                                        src={content.cover_url}
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
                                        {renderScreenshotsForGame(
                                            content.game_id
                                        )}
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
                    naturalSlideHeight={width < LG_SCREEN_SIZE ? 45 : 31}
                    totalSlides={props.content.length}
                    className="gameCarouselWrap"
                    visibleSlides={1}
                    infinite={true}
                    step={1}
                    isPlaying={true}
                    interval={5000}
                >
                    <div className="sliderAndButtonWrap">
                        <Slider>{renderSlides()}</Slider>

                        <ButtonBack
                            className={`gameBackButton ${
                                width < LG_SCREEN_SIZE
                                    ? "hideFeaturedCarouselButton"
                                    : ""
                            }`}
                        >
                            <RiArrowLeftSLine />
                        </ButtonBack>
                        <ButtonNext
                            className={`gameNextButton ${
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
