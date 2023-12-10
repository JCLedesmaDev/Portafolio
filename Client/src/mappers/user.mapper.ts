/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserModel } from '@/models/IUser.model';

export const user = (resource: any): IUserModel => {
    const mapper: IUserModel = {
        fullName: resource?.fullName,
        imageProfile: resource?.imageProfile,
        seniority: resource?.seniority,
        aboutMe: resource?.aboutMe,
        email: resource?.email,
        curriculumVitae: resource?.curriculumVitae,
        mySoftSkills: resource?.mySoftSkills,
        //projectsList: mappers.multipleProjects(resource?.projectsList as IProjectSchema[]),
        //skillsList: mappers.multipleSkills(resource?.skillsList as ISkillSchema[])
    }
    return mapper
}