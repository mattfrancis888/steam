import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
const Routes: React.FC<{}> = () => {
    return (
        <React.Fragment>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
            </Switch>
        </React.Fragment>
    );
};

export default Routes;
