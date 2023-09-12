import {  } from "react-router";
 import { Route, Navigate} from "react-router-dom";
import { IUserModels } from "../../models/IUser.models";
import { getStorage } from "../../utils/magnamentStorage";

interface IRoutePrivate {
    children: JSX.Element;
    redirectTo?: string;
}

export const RoutePrivate: React.FC<IRoutePrivate> = ({ children, redirectTo ="/authUser" }) => {
    const jwt = getStorage<IUserModels>("User")?.tokenAuth;
    if (jwt == undefined) {
        return <Navigate to={redirectTo} />
    }
    return children
 };
