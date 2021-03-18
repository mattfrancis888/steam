import { ActionTypes } from "./types";
import axios from "./axiosConfig";
import { Dispatch } from "redux";

import { SERVER_ERROR_MESSAGE } from "../constants";
import history from "../browserHistory";
import { IPostReview } from "../components/GameInfo";

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

export interface FetchGameInfoAction {
    type: ActionTypes.FETCH_GAME_INFO;
    payload: FetchGameInfoResponse;
}

export interface FetchGameInfoReviewsAction {
    type: ActionTypes.FETCH_GAME_INFO_REVIEWS;
    payload: FetchGameInfoReviewsResponse;
}

export interface PostReviewAction {
    type: ActionTypes.POST_REVIEW;
    payload: PostReviewResponse;
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
export interface Reviewer {
    game_id: number;
    username: string;
    avatar_url: string;
    recommend: boolean;
    opinion: string;
}

export interface FetchGamesResponse {
    games: Game[];
}

export interface FetchGameInfoResponse {
    games: Game[];
}

export interface FetchGameInfoReviewsResponse {
    reviews: Reviewer[];
}

export interface PostReviewResponse {
    reviews: Reviewer[];
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

export const fetchGameInfo = (gameId: number) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get<FetchGameInfoResponse>(
            `/api/game-info/${gameId}`
        );
        dispatch<FetchGameInfoAction>({
            type: ActionTypes.FETCH_GAME_INFO,
            payload: response.data,
        });
    } catch (error) {
        dispatch<GamesErrorAction>({
            type: ActionTypes.GAME_ERROR,
            payload: { error: SERVER_ERROR_MESSAGE },
        });
    }
};

export const fetchGameInfoReviews = (gameId: number) => async (
    dispatch: Dispatch
) => {
    try {
        const response = await axios.get<FetchGameInfoReviewsResponse>(
            `/api/reviews/${gameId}`
        );
        dispatch<FetchGameInfoReviewsAction>({
            type: ActionTypes.FETCH_GAME_INFO_REVIEWS,
            payload: response.data,
        });
    } catch (error) {
        dispatch<GamesErrorAction>({
            type: ActionTypes.GAME_ERROR,
            payload: { error: SERVER_ERROR_MESSAGE },
        });
    }
};

export const postReview = (formValues: IPostReview, gameId: number) => async (
    dispatch: Dispatch
) => {
    try {
        const response = await axios.post<PostReviewResponse>(
            `/api/review/${gameId}`,
            formValues
        );
        dispatch<PostReviewAction>({
            type: ActionTypes.POST_REVIEW,
            payload: response.data,
        });
    } catch (error) {
        dispatch<GamesErrorAction>({
            type: ActionTypes.GAME_ERROR,
            payload: { error: SERVER_ERROR_MESSAGE },
        });
    }
};
