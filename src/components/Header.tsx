import React, { useEffect } from "react";
import history from "../browserHistory";
const Header: React.FC<{}> = (props) => {
    return (
        <div className="headerContainer" data-testid="steamHeaderLogo">
            <div
                className="headerLogoImageWrap"
                onClick={() => {
                    history.push("/");
                }}
            >
                <img
                    src="https://store.cloudflare.steamstatic.com/public/shared/images/responsive/header_logo.png"
                    alt="logo"
                />
            </div>
            <h3 className="headerAuthText">Sign in</h3>
        </div>
    );
};

export default Header;
