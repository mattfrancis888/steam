import React, { useRef, useEffect, useState } from "react";
import history from "../browserHistory";
import { AiOutlineSearch } from "react-icons/ai";
import { fetchGamesByKeyword } from "../actions";
import anime from "animejs/lib/anime.es.js";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
import axios from "../actions/axiosConfig";
import { Game } from "../actions";
import useComponentVisible from "../useComponentVisible";
interface SearchbarProps {
    fetchGamesByKeyword?(searchKeyword: string): void;
}

const Searchbar: React.FC<SearchbarProps> = (props) => {
    //Detect click outside of component:
    // https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
    const {
        ref,
        isComponentVisible,
        setIsComponentVisible,
    } = useComponentVisible(true);
    const searchBarInputRef = useRef<HTMLInputElement>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [data, dataSet] = useState<any>(null);
    useEffect(() => {
        async function fetchMyAPI() {
            let response = await axios.get(`/api/search?q=${searchTerm}`);
            console.log("matt", response.data);
            dataSet(response.data);
        }

        const delayDebounceFn = setTimeout(() => {
            // Send Axios request here
            if (props.fetchGamesByKeyword) {
                if (searchTerm === "") {
                    // history.push("/search");
                } else {
                    fetchMyAPI();
                    // history.push(`/search?q=${searchTerm}`);
                }
            }
        }, 850);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleKeyDown = (event: any) => {
        //https://stackoverflow.com/questions/31272207/to-call-onchange-event-after-pressing-enter-key
        if (event.key === "Enter") {
            event.preventDefault();

            if (searchTerm === "") {
                history.push("/search");
            } else {
                if (props.fetchGamesByKeyword)
                    props.fetchGamesByKeyword(searchTerm);
                history.push(`/search?q=${searchTerm}`);
            }
        }
    };
    const renderSearchPreview = () => {
        if (data) {
            if (data.games) {
                if (data.games.length > 0) {
                    return data.games.map((game: Game) => {
                        return (
                            <div className="matchRow">
                                <img src={game.cover_url} alt="game"></img>
                                <div className="matchTextWrap">
                                    <p className="matchTitle">{game.title}</p>
                                    <p className="matchPrice">
                                        $
                                        {parseFloat(
                                            game.price_after_discount
                                        ).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        );
                    });
                }
            }
        }
    };
    return (
        <React.Fragment>
            <form className={"searchBarForm"}>
                <input
                    autoFocus={false}
                    data-testid="searchBarInput"
                    className="searchBarInput"
                    type="search"
                    placeholder="Search games"
                    name="search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    ref={searchBarInputRef}
                    onClick={() => setIsComponentVisible(true)}
                />
                <AiOutlineSearch
                    className="searchBarIcons"
                    data-testid="searchIcon"
                    onClick={() => {
                        // directToListingsPage();
                    }}
                />
                <div className="matchContainer" ref={ref}>
                    {isComponentVisible && renderSearchPreview()}
                </div>
            </form>
        </React.Fragment>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        // search: state.search,
    };
};

export default connect(mapStateToProps, { fetchGamesByKeyword })(Searchbar);
