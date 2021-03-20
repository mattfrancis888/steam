import { Game } from "actions";
import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import history from "../browserHistory";
import Routes from "./Routes";
const Cart: React.FC<{}> = () => {
    let [cart, setCart] = useState<[]>([]);
    let localCart = localStorage.getItem("cart");
    const removeItem = (gameId: number) => {
        //create cartCopy
        let cartCopy: any = [...cart];

        cartCopy = cartCopy.filter((item: Game) => item.game_id != gameId);

        //update state and local
        setCart(cartCopy);

        let cartString = JSON.stringify(cartCopy);
        localStorage.setItem("cart", cartString);
    };

    useEffect(() => {
        if (localCart != null) {
            let parsedLocalCart = JSON.parse(localCart);
            //load persisted cart into state if it exists
            // console.log(parsedLocalCart);
            setCart(parsedLocalCart);
        }
    }, []);

    const renderPrice = (game: Game) => {
        if (parseFloat(game.discount_percentage) > 0) {
            return (
                <div className="gameInfoAdjustedPriceWrap">
                    <div>
                        <p className="gameInfoOrigPriceStriked">
                            ${parseFloat(game.price).toFixed(2)}
                        </p>
                        <p className="cartPrice">
                            ${parseFloat(game.price_after_discount).toFixed(2)}
                        </p>
                    </div>
                </div>
            );
        } else {
            //no discount
            return (
                <p className="cartPrice">
                    ${parseFloat(game.price).toFixed(2)}
                </p>
            );
        }
    };

    const renderCartRows = () => {
        if (cart.length === 0) {
            <h1 className="emptyCart">Your cart is empty</h1>;
        }
        return cart.map((game: Game, index) => {
            return (
                <div className="cartRow" key={index}>
                    <div className="cartImageAndTitleWrap">
                        <div className="cartGameImage">
                            <img src={game.cover_url} alt="game"></img>
                        </div>
                        <p className="cartTitle">{game.title}</p>
                    </div>
                    <div className="cartPriceAndRemoveWrap">
                        {/* <p className="cartPrice">
                            ${item.price_after_discount}
                        </p> */}
                        {renderPrice(game)}
                        <p
                            className="removeFromCart"
                            data-testid="removeCart"
                            onClick={() => {
                                removeItem(game.game_id);
                            }}
                        >
                            Remove
                        </p>
                    </div>
                </div>
            );
        });
    };

    const renderTotal = () => {
        return cart.reduce((acc: number, curr: Game) => {
            console.log(curr);
            return parseInt(acc + curr.price);
        }, 0);
    };
    return (
        <div>
            <div className="cartHeaderContainer">
                <h1 className="cartHeader">Your shopping cart</h1>
            </div>
            <div className="cartContainer">
                {renderCartRows()}
                <div className="totalContainer">
                    <div className="totalTextWrap">
                        <p className="estimatedTotal">Estimated Total</p>
                        <p className="totalPrice">
                            $
                            {cart
                                .reduce((acc: any, curr: Game) => {
                                    console.log(curr);
                                    return (
                                        parseFloat(acc) +
                                        parseFloat(curr.price_after_discount)
                                    );
                                }, 0)
                                .toFixed(2)}
                        </p>
                    </div>

                    <button
                        className="purchaseButton"
                        onClick={() => {
                            alert(
                                "Let's pretend that you purchased these items!"
                            );
                            localStorage.clear();
                            setCart([]);
                        }}
                    >
                        Purchase
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
