import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import { Publicacion } from "./publicacionModel";
import { Usuario } from "./usuarioModel";
import { Comentario as ComentarioInterfaces } from "../interfaces/comentario";

export interface ComentarioModel
  extends Model<ComentarioInterfaces>,
    ComentarioInterfaces {}

export const Comentario = sequelize.define<ComentarioModel>(
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
