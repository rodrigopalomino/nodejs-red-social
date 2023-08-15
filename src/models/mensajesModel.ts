import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Usuario } from "./usuarioModel";

export const Mensaje = sequelize.define(
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
    f_mensaje: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
