import { model, Schema, Document, PaginateModel, ObjectId, Types } from 'mongoose';
import mongooseDelete, { SoftDeleteInterface, SoftDeleteModel } from 'mongoose-delete';
import mongoosePaginate from 'mongoose-paginate-v2'


export interface ICategorySchema extends Document, SoftDeleteInterface {
    name: string;
}

const CategorySchema = new Schema<ICategorySchema>({
    name: { type: String, required: true },
}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})

/* Le indicamos a nuestro modelo, que sobre escriba los metodos
 le que brinda mongoose, por los que nos brinda mongooseDelete */
 CategorySchema.plugin(mongooseDelete, { overrideMethods: 'all' })

export default model<ICategorySchema, SoftDeleteModel<ICategorySchema>>('Categories', CategorySchema);
