import { model, Schema, Document } from 'mongoose';

export interface IRegisterBDSchema extends Document {
    type: string;
    user: string;
    date: Date;
    request: any;
    response: any;
}

const RegisterDbSchema = new Schema<IRegisterBDSchema>({
    type: { type: String, required: true },
    date: { type: Date, required: true },
    request: { type: Object, required: true },
    response: { type: Object, required: true },
    user: { type: String },

}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})

export default model<IRegisterBDSchema>('RegistersDb', RegisterDbSchema);