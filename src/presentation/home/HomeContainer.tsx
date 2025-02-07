import { useNavigate } from "react-router";
import statics from "../../constants"
import HomeView from "./HomeView"

const HomeContainer = () => {
    const navigate = useNavigate();
    const handleClick = () => navigate("/order");

    return (
        <div className="border-8 bg-neutral-950 h-dvh p-10 flex justify-center items-center">
            <HomeView
                title={statics.INIT_TITLE}
                label={statics.INIT_LABEL}
                handlerEvent={handleClick} />
        </div>
    )
}

export default HomeContainer


