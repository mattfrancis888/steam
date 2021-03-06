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
import { CommunityCarouelProps } from "./Home";
import anime from "animejs/lib/anime.es.js";
import history from "../browserHistory";
import {
    LG_SCREEN_SIZE,
    XL_SCREEN_SIZE,
    MED_SCREEN_SIZE,
    SM_SCREEN_SIZE,
} from "../constants";
import { Game } from "../actions";
const videosFromSteam = [
    "https://cdn.akamai.steamstatic.com/steam/apps/256767815/movie480.webm?t=1583175736",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/81958/movie480.webm?t=1554409259",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/256694830/movie480.webm?t=1561485484",
    "https://cdn.akamai.steamstatic.com/steam/apps/2028471/movie480.webm?t=1447357639",
];
const CommunityCarousel: React.FC<CommunityCarouelProps> = (props) => {
    const { width } = useWindowDimensions();
    const [style, setStyle] = useState({ opacity: "1" });

    const renderPrice = (content: Game) => {
        if (parseFloat(content.discount_percentage) > 0) {
            return (
                <div className="communityAdjustedPriceWrap">
                    <div className="communityDiscount">
                        -{parseFloat(content.discount_percentage) * 100}%
                    </div>
                    <div>
                        <p className="communityOrigPriceStriked">
                            ${parseFloat(content.price).toFixed(2)}
                        </p>
                        <p className="communityGamePrice">
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

    const renderSlides = () => {
        return props.content.map((content, index) => {
            return (
                <Slide
                    index={index}
                    key={index}
                    onClick={() => {
                        history.push(`/game/${content.game_id}`);
                    }}
                >
                    <LazyLoad>
                        <div
                            key={index}
                            className={`communityContainerCarousel communityAnime${index}`}
                            onLoad={() => {
                                anime({
                                    targets: `.communityAnime${index}`,
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
                            <div className="communityCarouselSectionWrap">
                                <div
                                    className="communityCarouselImageSection"
                                    onMouseEnter={(e) => {
                                        setStyle({ opacity: "1" });
                                    }}
                                    onMouseLeave={(e) => {
                                        setStyle({ opacity: "0" });
                                    }}
                                >
                                    <img
                                        src={content.cover_url}
                                        alt="game"
                                    ></img>

                                    <video
                                        className="communityCarouselVid"
                                        autoPlay={true}
                                        playsInline={false}
                                        muted={true}
                                        loop={true}
                                        style={style}
                                    >
                                        {/* <source
                                            src="  https://cdn.cloudflare.steamstatic.com/steam/apps/256820708/movie480_vp9.webm?t=1612810771"
                                            type="video/mp4"
                                        /> */}
                                        <source
                                            src={videosFromSteam[index]}
                                            type="video/mp4"
                                        />
                                    </video>
                                    <div className="communityPrice">
                                        {renderPrice(content)}
                                    </div>
                                </div>
                                <div className="communityCarouselAboutSection">
                                    <p className="communityCarouselGameAbout">
                                        {content.about}
                                    </p>

                                    <p className="communityCarouselVisitGame">
                                        Visit Game Page
                                    </p>

                                    {/* <div className="communityUserInfoWrap">
                                        <img
                                            className="communityAvatar"
                                            src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/fd/fdfd938f7eae06151877fc2e14e6d70806463c8c.jpg"
                                            alt="avatar"
                                        ></img>
                                        <p className="communityUsername">
                                            Username of user
                                        </p>
                                    </div> */}
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
                    // isPlaying={true}
                    interval={5000}
                >
                    <div className="sliderAndButtonWrap">
                        <Slider>{renderSlides()}</Slider>

                        <ButtonBack
                            className={`gameBackButton ${
                                width < LG_SCREEN_SIZE
                                    ? "hideCommunityCarouselButton"
                                    : ""
                            }`}
                        >
                            <RiArrowLeftSLine />
                        </ButtonBack>
                        <ButtonNext
                            className={`gameNextButton ${
                                width < LG_SCREEN_SIZE
                                    ? "hideCommunityCarouselButton"
                                    : ""
                            }`}
                        >
                            <RiArrowRightSLine />
                        </ButtonNext>

                        <div
                            className={`showButtonsForSmallScreensWrap ${
                                width > LG_SCREEN_SIZE
                                    ? "hideCommunityCarouselButtonsWrap"
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

export default CommunityCarousel;
