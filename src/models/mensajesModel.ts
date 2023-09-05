import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import { Usuario } from "./usuarioModel";
import { Mensaje as MensajeInterfaces } from "../interfaces/mensaje";

export interface MensajeModel
  extends Model<MensajeInterfaces>,
    MensajeInterfaces {}

export const Mensaje = sequelize.define<MensajeModel>(
  "mensajes",
  {
    mensaje_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiver: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contenido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Mensaje.belongsTo(Usuario, {
  foreignKey: "sender",
});

Mensaje.belongsTo(Usuario, {
  foreignKey: "receiver",
});
