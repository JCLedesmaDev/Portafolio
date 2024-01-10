import { IUserModel } from '@/models/IUser.model';
import { magnamentStorage } from '@/utils/index.utils';
import { Navigate } from "react-router-dom";

interface IRoutePrivate {
    children: JSX.Element;
    redirectTo: string;
}

export const RoutePrivate: React.FC<IRoutePrivate> = ({ children, redirectTo }) => {
    const usrInfo = magnamentStorage.get<IUserModel>("user");
    if (usrInfo === undefined) {
        return <Navigate to={redirectTo} />
    }
    return children
};