import React, { useEffect } from "react";
import history from "../browserHistory";
import { connect } from "react-redux";
import { signOut } from "../actions";
import { StoreState } from "../reducers";
interface HeaderProps {
    authStatus?: string | null;
    signOut(): void;
}
const Header: React.FC<HeaderProps> = (props) => {
    return (
        <nav className="headerContainer" data-testid="steamHeaderLogo">
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
            <h3
                className="headerAuthText"
                onClick={() => {
                    if (props.authStatus) props.signOut();
                    else {
                        history.push("/signin");
                    }
                }}
            >
                {props.authStatus ? "Sign Out" : "Sign In"}
            </h3>
        </nav>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        authStatus: state.authStatus.authenticated,
    };
};

export default connect(mapStateToProps, { signOut })(Header);
