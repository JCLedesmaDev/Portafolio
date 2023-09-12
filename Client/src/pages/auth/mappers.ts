import { IRolModels } from "../../models/IRol.models";
import { IUserModels } from "../../models/IUser.models";
import { ILoginResponseDto, IRol } from "./interface/backToFront/ILoginResponse.dto";

export const userMapper = (LoginResponse: ILoginResponseDto): IUserModels => {
    const formattedUser: IUserModels = {
        id: LoginResponse.user?.id,
        fullName: LoginResponse.user?.fullName,
        email: LoginResponse.user?.email,
        roles: multipleRoles(LoginResponse.user.roles as IRol[]),
        tokenAuth: LoginResponse.token,
    };
    return formattedUser;
};

const multipleRoles = (roles: IRol[]): IRolModels[] => {
    const rolesMapper: IRolModels[] = roles.map( rol => {
        return {
            id: rol.id,
            name: rol.name
        }
    })
    return rolesMapper
} 