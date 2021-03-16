import { ActionTypes } from "./types";
import axios from "./axiosConfig";
import { Dispatch } from "redux";

import { SERVER_ERROR_MESSAGE } from "../constants";
import history from "../browserHistory";

export interface ServerError {
    error: string;
}

export interface FetchGamesBaseInfoAction {
    type: ActionTypes.FETCH_GAMES_BASE_INFO;
    payload: FetchGamesBaseInfoResponse;
}
export interface FetchGamesGenreAction {
    type: ActionTypes.FETCH_GAMES_GENRE;
    payload: FetchGamesGenreResponse;
}

export interface GamesErrorAction {
    type: ActionTypes.GAME_ERROR;
    payload: ServerError;
}

export interface GameBaseInfo {
    price_id: number;
    game_id: number;
    title: string;
    cover_url: string;
    release_date: string;
    about: string;
    name_tokens: string;
    price: string;
    discount_percentage: string;
    price_after_discount: string;
}

export interface GameGenre {
    genre_id: number;
    game_id: number;
    genre_type: string;
}
export interface FetchGamesBaseInfoResponse {
    games: GameBaseInfo[];
}
export interface FetchGamesGenreResponse {
    games: GameGenre[];
}

export const fetchGamesBaseInfo = () => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get<FetchGamesBaseInfoResponse>(
            `/api/games`
        );
        dispatch<FetchGamesBaseInfoAction>({
            type: ActionTypes.FETCH_GAMES_BASE_INFO,
            payload: response.data,
        });
    } catch (error) {
        dispatch<GamesErrorAction>({
            type: ActionTypes.GAME_ERROR,
            payload: { error: SERVER_ERROR_MESSAGE },
        });
    }
};

export const fetchGamesGenres = () => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get<FetchGamesGenreResponse>(
            `/api/games-genre`
        );
        dispatch<FetchGamesGenreAction>({
            type: ActionTypes.FETCH_GAMES_GENRE,
            payload: response.data,
        });
    } catch (error) {
        dispatch<GamesErrorAction>({
            type: ActionTypes.GAME_ERROR,
            payload: { error: SERVER_ERROR_MESSAGE },
        });
    }
};
