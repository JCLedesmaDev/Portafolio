import { ObjectId, Document } from "mongoose";
import { SoftDeleteInterface } from "mongoose-delete";

export interface IUserSchema extends Document, SoftDeleteInterface {
    fullName: string;
    seniority: string;
    imageProfile: string;
    aboutMe: string;
    mySkills: string;
    email: string;
    password: string;
    projectList: ObjectId[] | IProjectSchema[];
    techologyList: ObjectId[] | ITechnologySchema[];
    curriculumVitae: string;
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
    colaborators: ObjectId[] | IColaboratorSchema[];
    images: string[],
    user: ObjectId | IUserSchema
}

export interface IColaboratorSchema extends Document, SoftDeleteInterface {
    name: string;
    repositoryLink: string;
}

export interface ITechnologySchema extends Document, SoftDeleteInterface {
    name: string;
    image: string;
    category: ObjectId | ICategorySchema;
    user: ObjectId | IUserSchema;
}

export interface ICategorySchema extends Document, SoftDeleteInterface {
    name: string;
}
