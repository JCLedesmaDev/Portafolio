import { model, Schema, Document, Types,  PaginateModel } from 'mongoose';
import mongooseDelete, { SoftDeleteInterface, SoftDeleteModel } from 'mongoose-delete';
import mongoosePaginate from 'mongoose-paginate-v2'


export interface IProjectSchema extends Document, SoftDeleteInterface {
    name: string;
    description: string;
    periodTimeFrom: number;
    periodTimeTo: number;
    typeProject: string;
    projectLink: string;
    repositoryLink: string;
    colaborators: [{
        name: string,
        repositortLink: string,
    }]
}

const ProjectSchema = new Schema<IProjectSchema>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    periodTimeFrom: { type: Number, required: true },
    periodTimeTo: { type: Number, required: true },
    typeProject: { type: String, required: true },
    projectLink: { type: String, required: false },
    repositoryLink: { type: String, required: true },
    colaborators: [{ type: Types.ObjectId, ref: "Colaborators" }]

}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})

/* Le indicamos a nuestro modelo, que sobre escriba los metodos
 le que brinda mongoose, por los que nos brinda mongooseDelete */
ProjectSchema.plugin(mongooseDelete, { overrideMethods: 'all' })

// Le indicamos a nuestro modelo, que va a poder paginar
ProjectSchema.plugin(mongoosePaginate)

export default model<IProjectSchema, SoftDeleteModel<IProjectSchema> & PaginateModel<IProjectSchema>>('Projects', ProjectSchema);
