import { Navigate } from "react-router-dom";
import { IUserModels } from "../../models/IUser.models";
import { magnamentStorage } from "../../utils";

interface IRoutePrivate {
    children: JSX.Element;
    redirectTo?: string;
}

export const RoutePrivate: React.FC<IRoutePrivate> = ({ children, redirectTo = "/authUser" }) => {
    const jwt = magnamentStorage.get<IUserModels>("User")?.tokenAuth;
    if (jwt == undefined) {
        return <Navigate to={redirectTo} />
    }
    return children
};
