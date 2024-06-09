import { ISkillSchema } from '@models/ISchemaCollections';
import { model, Schema, Types } from 'mongoose';
import mongooseDelete, { SoftDeleteModel } from 'mongoose-delete';


const SkillSchema = new Schema<ISkillSchema>({
    technologysList: { type: [{ type: Types.ObjectId, ref: 'Technology' }], required: false, default: [] },
    category: { type: Types.ObjectId, ref: 'Category', required: true },
    user: { type: Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})

/* Le indicamos a nuestro modelo, que sobre escriba los metodos
 le que brinda mongoose, por los que nos brinda mongooseDelete */
SkillSchema.plugin(mongooseDelete, { overrideMethods: 'all' })


export default model<ISkillSchema, SoftDeleteModel<ISkillSchema>>('Skill', SkillSchema);
