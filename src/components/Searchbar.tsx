import React, { useRef, useEffect, useState } from "react";
import history from "../browserHistory";
import { AiOutlineSearch } from "react-icons/ai";
import { fetchGamesByKeyword } from "../actions";
import anime from "animejs/lib/anime.es.js";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
interface SearchbarProps {
    fetchGamesByKeyword?(searchKeyword: string): void;
}

const Searchbar: React.FC<SearchbarProps> = (props) => {
    const searchBarInputRef = useRef<HTMLInputElement>(null);

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // const delayDebounceFn = setTimeout(() => {
        //     // Send Axios request here
        //     if (props.fetchGamesByKeyword) {
        //         props.fetchGamesByKeyword(searchTerm);
        //         if (searchTerm === "") {
        //             history.push("/search");
        //         } else {
        //             history.push(`/search?q=${searchTerm}`);
        //         }
        //     }
        // }, 850);
        // return () => clearTimeout(delayDebounceFn);
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

    return (
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
            />
            <AiOutlineSearch
                className="searchBarIcons"
                data-testid="searchIcon"
                onClick={() => {
                    // directToListingsPage();
                }}
            />
        </form>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        // search: state.search,
    };
};

export default connect(mapStateToProps, { fetchGamesByKeyword })(Searchbar);
