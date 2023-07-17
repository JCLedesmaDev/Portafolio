import { model, Schema, Document, Types, ObjectId } from 'mongoose';
import mongooseDelete, { SoftDeleteInterface, SoftDeleteModel } from 'mongoose-delete';


export interface IColaboratorSchema extends Document, SoftDeleteInterface {
    name: string;
    repositoryLink: string;
}

const ColaboratorSchema = new Schema<IColaboratorSchema>({
    name: { type: String, required: true },
    repositoryLink: { type: String, required: true },
}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})

/* Le indicamos a nuestro modelo, que sobre escriba los metodos
 le que brinda mongoose, por los que nos brinda mongooseDelete */
ColaboratorSchema.plugin(mongooseDelete, { overrideMethods: 'all' })


export default model<IColaboratorSchema, SoftDeleteModel<IColaboratorSchema>>('Colaborators', ColaboratorSchema);
