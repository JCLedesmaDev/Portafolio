import { IRegisterDbSchema } from '@models/ICollections';
import { model, Schema, PaginateModel, Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const RegisterDbSchema = new Schema<IRegisterDbSchema>({
    type: { type: String, required: true },
    date: { type: String, required: true },
    request: { type: Object, required: true },
    response: { type: Object, required: true },
    user: { type: Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})

// Le indicamos a nuestro modelo, que va a poder paginar
RegisterDbSchema.plugin(mongoosePaginate)

export default model<IRegisterDbSchema, PaginateModel<IRegisterDbSchema>>('RegisterDb', RegisterDbSchema);
