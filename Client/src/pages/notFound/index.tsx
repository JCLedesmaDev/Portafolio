import { Link, useRouteError } from "react-router-dom"
import notFoundCSS from "./index.module.css"
import notFoundImg from "../../assets/Error-404.png";

export const NotFound: React.FC = () => {
    return (
        <div className={`containerPageAlbum ${notFoundCSS.container}`}>
            <div>
                <img src={notFoundImg} alt="asd" />
            </div>
            <Link className={`${notFoundCSS.title}`} to="/">Regresar al inicio</Link>
        </div>
    )
}