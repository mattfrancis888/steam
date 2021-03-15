import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import GameInfo from "./GameInfo";
import Cart from "./Cart";
const Routes: React.FC<{}> = () => {
    return (
        <React.Fragment>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/game/:gameId" exact component={GameInfo} />
                <Route path="/cart" exact component={Cart} />
            </Switch>
        </React.Fragment>
    );
};

export default Routes;
