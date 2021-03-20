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
import { GameInfoCarouselProps } from "./GameInfo";
import anime from "animejs/lib/anime.es.js";
import { LG_SCREEN_SIZE, MED_SCREEN_SIZE } from "../constants";

const GameInfoCarousel: React.FC<GameInfoCarouselProps> = (props) => {
    const { width } = useWindowDimensions();
    const [displayImage, setDisplayImage] = useState(props.screenshots[0]);
    const [imageClicked, setImageClicked] = useState(0);

    useEffect(() => {
        //When user clicks another game after clicking a game
        // displayImage hook was at the previous's displayImage
        //so update it here
        setDisplayImage(props.screenshots[0]);
    }, [props.screenshots]);

    const renderSlides = () => {
        return props.screenshots.map((screenshot, index) => {
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
                                setDisplayImage(screenshot);
                                setImageClicked(index);
                                anime({
                                    targets: `.gameInfoDisplayImage`,
                                    // Properties
                                    // Animation Parameters

                                    opacity: [
                                        {
                                            value: [1, 0],
                                            duration: 0,
                                            easing: "linear",
                                        },
                                    ],
                                });
                            }}
                        >
                            <div
                                className={`gameInfoCarouselScreenshots ${
                                    imageClicked === index
                                        ? `gameInfoCarouselScreenshotsClicked`
                                        : ``
                                } `}
                            >
                                <img src={screenshot} alt="screenshot" />
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
                    naturalSlideHeight={60}
                    totalSlides={props.screenshots.length}
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
                className="gameInfoDisplayImage"
                src={displayImage}
                onLoad={() => {
                    anime({
                        targets: `.gameInfoDisplayImage`,
                        // Properties
                        // Animation Parameters

                        opacity: [
                            {
                                value: [0, 1],
                                duration: 100,
                                easing: "linear",
                            },
                        ],
                    });
                }}
                alt="game"
            ></img>
            {renderCarousel()}
        </div>
    );
};

export default GameInfoCarousel;
