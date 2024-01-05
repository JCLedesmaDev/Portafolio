/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserModel } from '@/models/IUser.model';


export const multipleUsers = (resources: any[]): IUserModel[] => {
    return resources.map(user => singleUser(user))
}

export const singleUser = (resource: any): IUserModel => {
    const mapper: IUserModel = {
        id: resource?.id,
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