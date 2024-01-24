import { ObjectId, Document } from "mongoose";
import { SoftDeleteInterface } from "mongoose-delete";

export interface IUserSchema extends Document, SoftDeleteInterface {
    fullName: string;
    rol: string;
    imageProfile: string;
    aboutMe: string;
    email: string;
    password: string;
    projectsList: ObjectId[] | IProjectSchema[];
    curriculumVitae: string;
    mySoftSkills: string;
    skillsList: ObjectId[] | ISkillSchema[];
}

export interface IProjectSchema extends Document, SoftDeleteInterface {
    name: string;
    description: string;
    details: string;
    periodTimeFrom: number;
    periodTimeTo: number;
    typeProject: string;
    projectLink: string;
    repositoryLink: string;
    colaboratorsList: ObjectId[] | IColaboratorSchema[];
    images: string[],
    user: ObjectId | IUserSchema
}
export interface IColaboratorSchema extends Document, SoftDeleteInterface {
    name: string;
    repositoryLink: string;
}

export interface ISkillSchema extends Document, SoftDeleteInterface {
    technologysList: ObjectId | ITechnologySchema[];
    category: ObjectId | ICategorySchema;
    user: ObjectId | IUserSchema;
}
export interface ITechnologySchema extends Document, SoftDeleteInterface {
    name: string;
    image: string;
    category: ObjectId | ICategorySchema;
}
export interface ICategorySchema extends Document, SoftDeleteInterface {
    name: string;
}

export interface ILoggerDbSchema extends Document {
    type: string;
    user: ObjectId | IUserSchema;
    date: number;
    url: string;
    method: string;
    request: object;
    response: object;
}