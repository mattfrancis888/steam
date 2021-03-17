import { ActionTypes } from "./types";
import axios from "./axiosConfig";
import { Dispatch } from "redux";

import { SERVER_ERROR_MESSAGE } from "../constants";
import history from "../browserHistory";

export interface ServerError {
    error: string;
}

export interface FetchGamesAction {
    type: ActionTypes.FETCH_GAMES;
    payload: FetchGamesResponse;
}

export interface FetchDiscountedGamesAction {
    type: ActionTypes.FETCH_GAMES_DISCOUNTED;
    payload: FetchGamesResponse;
}

export interface GamesErrorAction {
    type: ActionTypes.GAME_ERROR;
    payload: ServerError;
}

export interface Game {
    game_id: number;
    title: string;
    cover_url: string;
    release_date: string;
    about: string;
    genres: string[];
    screenshots: string[];
    price: string;
    discount_percentage: string;
    price_after_discount: string;
}

export interface FetchGamesResponse {
    games: Game[];
}

export const fetchGames = () => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get<FetchGamesResponse>(`/api/games`);
        dispatch<FetchGamesAction>({
            type: ActionTypes.FETCH_GAMES,
            payload: response.data,
        });
    } catch (error) {
        dispatch<GamesErrorAction>({
            type: ActionTypes.GAME_ERROR,
            payload: { error: SERVER_ERROR_MESSAGE },
        });
    }
};

export const fetchDiscountedGames = () => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get<FetchGamesResponse>(
            `/api/games-discounted`
        );
        dispatch<FetchDiscountedGamesAction>({
            type: ActionTypes.FETCH_GAMES_DISCOUNTED,
            payload: response.data,
        });
    } catch (error) {
        dispatch<GamesErrorAction>({
            type: ActionTypes.GAME_ERROR,
            payload: { error: SERVER_ERROR_MESSAGE },
        });
    }
};
