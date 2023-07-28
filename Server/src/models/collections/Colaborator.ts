import { model, Schema } from 'mongoose';
import mongooseDelete, { SoftDeleteModel } from 'mongoose-delete';
import { IColaboratorSchema } from '@models/ICollections';

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

export default model<IColaboratorSchema, SoftDeleteModel<IColaboratorSchema>>('Colaborator', ColaboratorSchema);
