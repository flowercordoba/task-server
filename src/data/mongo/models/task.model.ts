/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Schema } from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  },
  dueDate: {
    type: Date
  },
  priority: {
    type: String,
    enum: ['alta', 'media', 'baja'],
    default: 'media'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  assignedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false
    }
  ]
});

/**
 * Configura la opción toJSON del esquema para personalizar la serialización de documentos.
 */
taskSchema.set('toJSON', {
  /**
   * Incluye campos virtuales en la salida JSON. Los campos virtuales son propiedades
   * que puedes definir en los esquemas de Mongoose que se comportan como si fueran campos
   * de la base de datos, pero no se guardan realmente en MongoDB.
   */
  virtuals: true,

  /**
   * Elimina la clave de versión de la salida JSON. Mongoose añade por defecto
   * una propiedad __v a todos los esquemas para llevar un registro de las versiones
   * del documento. Al establecer 'versionKey' en false, esta propiedad no se incluirá
   * en la salida JSON.
   */
  versionKey: false,

  /**
   * Una función de transformación que se llama justo antes de que el documento
   * se serialice a JSON. Se utiliza para modificar el objeto resultante.
   *
   * @param _doc El documento Mongoose original que se está serializando.
   * @param ret El objeto POJO (Plain Old JavaScript Object) que se convertirá a JSON.
   * @param _options Las opciones pasadas a toJSON.
   */
  transform: function (_doc, ret, _options) {
    /**
     * Elimina la propiedad _id del objeto de salida. La propiedad _id es utilizada internamente
     * por MongoDB como una clave primaria. Al eliminarla, la salida JSON será más limpia y solo
     * contendrá los campos definidos por el usuario en el esquema.
     */
    delete ret._id;
  }
});

export const TaskModel = mongoose.model('Task', taskSchema);
