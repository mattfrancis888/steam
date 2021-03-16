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
import { StoreState } from "../reducers";
import { connect } from "react-redux";
import _ from "lodash";

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = (props) => {
    const { width } = useWindowDimensions();

    //Duplicate of the one in Home, just in case we want to customize it
    const renderScreenshotsForGame = (gameId: number) => {
        let screenshots = _.filter(props.gamesScreenshot.data?.games, {
            game_id: gameId,
        });
        const screenshotsSplit = _.chunk(screenshots, 4);
        return screenshotsSplit[0].map((screenshot, index) => {
            return <img src={screenshot.screenshot_url} alt="preview"></img>;
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
                                    <p className="featuredCarouselGamePrice">
                                        ${parseFloat(content.price).toFixed(2)}
                                    </p>
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
const mapStateToProps = (state: StoreState) => {
    return {
        gamesBaseInfo: state.gamesBaseInfo,
        gamesGenre: state.gamesGenre,
        gamesScreenshot: state.gamesScreenshot,
    };
};

export default connect(mapStateToProps)(FeaturedCarousel);
