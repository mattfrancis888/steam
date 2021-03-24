import { ActionTypes } from "./types";
import axios from "./axiosConfig";
import { Dispatch } from "redux";

import { SERVER_ERROR_MESSAGE } from "../constants";
import history from "../browserHistory";
import { IPostAndEditReview } from "../components/GameInfo";

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

export interface FetchGamesByKeywordAction {
    type: ActionTypes.FETCH_GAMES_BY_KEYWORD;
    payload: FetchGamesResponse;
}

export interface FetchGameInfoAction {
    type: ActionTypes.FETCH_GAME_INFO;
    payload: FetchGameInfoResponse;
}

export interface FetchGameInfoReviewsAction {
    type: ActionTypes.FETCH_GAME_INFO_REVIEWS;
    payload: ReviewsResponse;
}

export interface PostReviewAction {
    type: ActionTypes.POST_REVIEW;
    payload: ReviewsResponse;
}

export interface EditReviewAction {
    type: ActionTypes.EDIT_REVIEW;
    payload: ReviewsResponse;
}

export interface DeleteReviewAction {
    type: ActionTypes.DELETE_REVIEW;
    payload: ReviewsResponse;
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

export interface ReviewsResponse {
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

export const fetchGamesByKeyword = (queryPath: string | string[]) => async (
    dispatch: Dispatch
) => {
    try {
        const response = await axios.get<FetchGamesResponse>(
            `/api/search?q=${queryPath}`
        );
        dispatch<FetchGamesByKeywordAction>({
            type: ActionTypes.FETCH_GAMES_BY_KEYWORD,
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
        const response = await axios.get<ReviewsResponse>(
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

export const postReview = (
    formValues: IPostAndEditReview,
    gameId: number
) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.post<ReviewsResponse>(
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

export const editReview = (
    formValues: IPostAndEditReview,
    gameId: number
) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.patch<ReviewsResponse>(
            `/api/edit/${gameId}`,
            formValues
        );
        dispatch<EditReviewAction>({
            type: ActionTypes.EDIT_REVIEW,
            payload: response.data,
        });
        // alert("Success! You have edited your review.");
    } catch (error) {
        dispatch<GamesErrorAction>({
            type: ActionTypes.GAME_ERROR,
            payload: { error: SERVER_ERROR_MESSAGE },
        });
    }
};

export const deleteReview = (gameId: number) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.delete<ReviewsResponse>(
            `/api/delete/${gameId}`
        );
        dispatch<DeleteReviewAction>({
            type: ActionTypes.DELETE_REVIEW,
            payload: response.data,
        });
        alert("Success! You have deleted your review.");
    } catch (error) {
        dispatch<GamesErrorAction>({
            type: ActionTypes.GAME_ERROR,
            payload: { error: SERVER_ERROR_MESSAGE },
        });
    }
};
