import React, { useEffect, useState, useRef } from "react";

const Search: React.FC<{}> = (props) => {
    // const renderScreenshotsForGame = (gameId: number) => {
    //     let game = _.filter(props.games.data?.games, {
    //         game_id: gameId,
    //     });
    //     let maxScreenshotToShow = 4;
    //     return game[0].screenshots.map((screenshot, index) => {
    //         if (index < maxScreenshotToShow)
    //             return <img key={index} src={screenshot} alt="preview"></img>;
    //     });
    // };

    // const renderGenresForGameText = (gameId: number) => {
    //     let filteredContent = _.filter(props.games.data?.games, {
    //         game_id: gameId,
    //     });

    //     return filteredContent.map((content, index) => {
    //         return content.genres.map((genre, index) => {
    //             if (content.genres.length === index + 1) {
    //                 return ` ${genre}`;
    //             }
    //             return ` ${genre},`;
    //         });
    //     });
    // };

    return (
        <div className="searchContainer">
            <div className="searchRowsColumn">
                <div className="searchRow">
                    <div className="searchRowImageAndTitleWrap">
                        <img
                            src="https://cdn.akamai.steamstatic.com/steam/apps/1174180/capsule_sm_120.jpg?t=1615608871 1x, https://cdn.akamai.steamstatic.com/steam/apps/1174180/capsule_231x87.jpg?t=1615608871 2x"
                            alt="game"
                        ></img>
                        <p className="searchGameTitle">RDR2</p>
                    </div>

                    <p className="searchRowDate">5 Dec 2019</p>
                    <div className="searchRowPriceWrap">
                        <div className="searchRowDiscount">-10%</div>
                        <div className="searchRowPriceTextWrap">
                            <p className="searchRowPriceStriked">18.99</p>
                            <p className="searchRowPrice">20.99</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="searchPreviewHover">
                <p className="searchGamePreviewTitle">
                    {/* {filteredContent.map((content, index) => {
                                return content.title;
                            })} */}
                    RDR2
                </p>

                <div className="chartGamePreviewScreenshots">
                    <img
                        src={
                            "https://cdn.cloudflare.steamstatic.com/steam/apps/518790/ss_8a75aa823fbaa3a8ec3cf844d1340308250737a4.600x338.jpg?t=1607595944 "
                        }
                        alt="preview"
                    ></img>
                    <div className="searchGameGenresWrap">
                        <p className="searchGameGenres">Action</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
