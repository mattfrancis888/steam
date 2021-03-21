import React, { useEffect, useState, useRef } from "react";
import Searchbar from "./Searchbar";
import history from "../browserHistory";
const CartAndSearchbar: React.FC<{}> = () => {
    let [cart, setCart] = useState<[]>([]);
    let localCart = localStorage.getItem("cart");

    const addItem = (item: any) => {
        //create a copy of our cart state, avoid overwritting existing state
        let cartCopy: any = [...cart];

        //assuming we have an ID field in our item
        let { game_id } = item;

        //look for item in cart array
        let existingItem = cartCopy.find(
            (cartItem: any) => cartItem.game_id === game_id
        );

        //if item already exists
        console.log(existingItem);
        if (existingItem) {
        } else {
            //if item doesn't exist, simply add it
            cartCopy.push(item);
        }

        //update app state
        setCart(cartCopy);

        //make cart a string and store in local space
        let stringCart = JSON.stringify(cartCopy);
        localStorage.setItem("cart", stringCart);
    };
    return (
        <div className="cartAndSearchWrap">
            <button
                className="cart"
                onClick={() => {
                    history.push("/cart");
                }}
            >{`Cart(${
                localCart !== null ? JSON.parse(localCart).length : "0"
            })`}</button>
            <Searchbar />
        </div>
    );
};
export default CartAndSearchbar;
