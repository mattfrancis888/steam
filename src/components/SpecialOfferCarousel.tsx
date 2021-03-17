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
import { SpecialOfferCarouselProps } from "./Home";
import anime from "animejs/lib/anime.es.js";
import { LG_SCREEN_SIZE, SM_SCREEN_SIZE, MED_SCREEN_SIZE } from "../constants";
import _ from "lodash";

const SpecialOfferCarousel: React.FC<SpecialOfferCarouselProps> = (props) => {
    const { width } = useWindowDimensions();
    const specialofferContent = _.chunk(props.content, 6);
    // console.log(specialofferContent);
    const renderSlides = () => {
        return specialofferContent.map((contents, index) => {
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
                            <div className="specialOfferCarouselSectionContainer">
                                {contents.map((content, index) => {
                                    return (
                                        <div
                                            className="specialOfferGameContainer"
                                            key={index}
                                        >
                                            <img
                                                src={content.cover_url}
                                                alt="game"
                                            ></img>
                                            <div className="specialOfferGameTextWrap">
                                                <div className="highlightedGamePriceWrap">
                                                    <div className="discountGamePrice">
                                                        -
                                                        {parseFloat(
                                                            content.discount_percentage
                                                        ) * 100}
                                                        %
                                                    </div>
                                                    <div className="adjustedPriceWrap">
                                                        <p className="gameOrigPrice">
                                                            $
                                                            {parseFloat(
                                                                content.price
                                                            ).toFixed(2)}
                                                        </p>
                                                        <p className="gameAdjustedPrice">
                                                            $
                                                            {parseFloat(
                                                                content.price_after_discount
                                                            ).toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </LazyLoad>
                </Slide>
            );
        });
    };
    const renderHeight = () => {
        if (width < SM_SCREEN_SIZE) {
            return 78;
        } else if (width < MED_SCREEN_SIZE) {
            return 76;
        } else if (width < LG_SCREEN_SIZE) {
            return 33;
        } else if (width >= LG_SCREEN_SIZE) {
            return 30;
        } else return 1;
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
                    naturalSlideHeight={renderHeight()}
                    totalSlides={specialofferContent.length}
                    className="gameCarouselWrap"
                    visibleSlides={1}
                    infinite={true}
                    step={1}
                    isPlaying={false}
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

export default SpecialOfferCarousel;
