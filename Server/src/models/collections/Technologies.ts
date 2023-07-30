import { ITechnologySchema } from '@models/ICollections';
import { model, Schema, PaginateModel, Types } from 'mongoose';
import mongooseDelete, { SoftDeleteModel } from 'mongoose-delete';
import mongoosePaginate from 'mongoose-paginate-v2'


const TechnologySchema = new Schema<ITechnologySchema>({
    name: { type: String, required: true },
    image: { type: String, required: true }, 
    category: { type: Types.ObjectId, ref: 'Categories', required: true },
    user: { type: Types.ObjectId, ref: 'Users', required: true }
}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})

/* Le indicamos a nuestro modelo, que sobre escriba los metodos
 le que brinda mongoose, por los que nos brinda mongooseDelete */
TechnologySchema.plugin(mongooseDelete, { overrideMethods: 'all' })

// Le indicamos a nuestro modelo, que va a poder paginar
TechnologySchema.plugin(mongoosePaginate)

export default model<ITechnologySchema, SoftDeleteModel<ITechnologySchema> & PaginateModel<ITechnologySchema>>('Technologies', TechnologySchema);
