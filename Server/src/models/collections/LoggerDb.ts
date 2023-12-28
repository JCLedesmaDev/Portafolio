import { ILoggerDbSchema } from '@models/ICollections';
import { model, Schema, PaginateModel, Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const LoggerDbSchema = new Schema<ILoggerDbSchema>({
    type: { type: String, required: true },
    date: { type: String, required: true },
    url: { type: String, required: true },
    method: { type: String, required: true },
    request: { type: Object, required: true },
    response: { type: Object, required: true },
    user: { type: Types.ObjectId, ref: 'User', required: false }
}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})

// Le indicamos a nuestro modelo, que va a poder paginar
LoggerDbSchema.plugin(mongoosePaginate)

export default model<ILoggerDbSchema, PaginateModel<ILoggerDbSchema>>('LoggerDb', LoggerDbSchema);
