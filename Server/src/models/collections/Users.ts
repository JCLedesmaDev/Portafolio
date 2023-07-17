import { model, Schema, Document, Types, ObjectId } from 'mongoose';
import mongooseDelete, { SoftDeleteInterface, SoftDeleteModel } from 'mongoose-delete';
import { IProjectSchema } from './Projects';


export interface IUserSchema extends Document, SoftDeleteInterface {
    fullName: string;
    email: string;
    password: string;
    projectList: ObjectId[] | IProjectSchema[];
}

const UserSchema = new Schema<IUserSchema>({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    projectList: [{ type: Types.ObjectId, ref: "Projects" }]
}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})

/* Le indicamos a nuestro modelo, que sobre escriba los metodos
 le que brinda mongoose, por los que nos brinda mongooseDelete */
UserSchema.plugin(mongooseDelete, { overrideMethods: 'all' })


export default model<IUserSchema, SoftDeleteModel<IUserSchema>>('Users', UserSchema);
