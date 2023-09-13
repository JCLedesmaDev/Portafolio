import { Navigate } from "react-router-dom";
import { IUserModels } from "@/models/index.models";
import { magnamentStorage } from "@/utils/index.utils";

interface IRoutePrivate {
    children: JSX.Element;
    redirectTo?: string;
}

export const RoutePrivate: React.FC<IRoutePrivate> = ({ children, redirectTo = "/authUser" }) => {
    const jwt = magnamentStorage.get<IUserModels>("user")?.tokenAuth;
    if (jwt == undefined) {
        return <Navigate to={redirectTo} />
    }
    return children
};
