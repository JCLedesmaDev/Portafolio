import { ITechnologySchema } from '@models/ISchemaCollections';
import { model, Schema, Types } from 'mongoose';
import mongooseDelete, { SoftDeleteModel } from 'mongoose-delete';


const TechnologySchema = new Schema<ITechnologySchema>({
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: Types.ObjectId, ref: 'Category', required: true },
}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})

/* Le indicamos a nuestro modelo, que sobre escriba los metodos
 le que brinda mongoose, por los que nos brinda mongooseDelete */
TechnologySchema.plugin(mongooseDelete, { overrideMethods: 'all' })



export default model<ITechnologySchema, SoftDeleteModel<ITechnologySchema>>('Technology', TechnologySchema);
