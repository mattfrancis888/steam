import React from "react";
import { Router } from "react-router-dom";
import history from "../browserHistory";
import Routes from "./Routes";
const Cart: React.FC<{}> = () => {
    return (
        <div>
            <div className="cartHeaderContainer">
                <h1 className="cartHeader">Your shopping cart</h1>
            </div>
            <div className="cartContainer">
                <div className="cartRow">
                    <div className="cartImageAndTitleWrap">
                        <div className="cartGameImage">
                            <img
                                src="https://cdn.akamai.steamstatic.com/steam/apps/489830/header.jpg?t=1590515887"
                                alt="game"
                            ></img>
                        </div>
                        <p className="cartTitle">Skyrim</p>
                    </div>
                    <div className="cartPriceAndRemoveWrap">
                        <p className="cartPrice">$18.99</p>
                        <p className="removeFromCart">Remove</p>
                    </div>
                </div>
                <div className="totalContainer">
                    <div className="totalTextWrap">
                        <p className="estimatedTotal">Estimated Total</p>
                        <p className="totalPrice">$18.99</p>
                    </div>

                    <button className="purchaseButton">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
