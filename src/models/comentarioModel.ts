import { DATE, DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Publicacion } from "./publicacionModel";
import { Usuario } from "./usuarioModel";

export const Comentario = sequelize.define(
  "comentarios",
  {
    comentario_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contenido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    f_comentario: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
  }
);

Comentario.belongsTo(Publicacion, {
  foreignKey: "post_id",
});

Comentario.belongsTo(Usuario, {
  foreignKey: "user_id",
});
