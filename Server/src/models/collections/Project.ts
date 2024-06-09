import { IProjectSchema } from '@models/ISchemaCollections';
import { model, Schema, Types } from 'mongoose';
import mongooseDelete, { SoftDeleteModel } from 'mongoose-delete';


const ProjectSchema = new Schema<IProjectSchema>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: String, required: true },
    periodTimeFrom: { type: Number, required: true },
    periodTimeTo: { type: Number, required: true },
    typeProject: { type: String, required: true },
    projectLink: { type: String, required: false },
    repositoryLink: { type: String, required: true },
    images: { type: [{ type: String }], default: [], required: true },
    colaboratorsList: { type: [{ type: Types.ObjectId, ref: 'Colaborator' }], required: false, default: [] },
    user: { type: Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})

/* Le indicamos a nuestro modelo, que sobre escriba los metodos
 le que brinda mongoose, por los que nos brinda mongooseDelete */
ProjectSchema.plugin(mongooseDelete, { overrideMethods: 'all' })

export default model<IProjectSchema, SoftDeleteModel<IProjectSchema>>('Project', ProjectSchema);
