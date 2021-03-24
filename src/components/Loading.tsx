import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import useWindowDimensions from "../windowDimensions";
import { MED_SCREEN_SIZE } from "../constants";
const Loading = (): JSX.Element => {
    const { width } = useWindowDimensions();
    return (
        <Loader
            type="ThreeDots"
            color="white"
            height={width < MED_SCREEN_SIZE ? 50 : 75}
            width={width < MED_SCREEN_SIZE ? 50 : 75}
            timeout={30000} //will show for 30 secs
        />
    );
};
export default Loading;
