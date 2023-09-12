export interface ILoginResponseDto {
    user: {
        id: string;
        fullName: string;
        email: string;
        roles: IRol[]
    }
    token: string;
}

export interface IRol{
    name: string;
    id: string;
}