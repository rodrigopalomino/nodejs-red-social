import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import { Usuario } from "./usuarioModel";
import { Publicacion as PublicacionInterfaces } from "../interfaces/publicacionInterfaces";

export interface PublicacionModel
  extends Model<PublicacionInterfaces>,
    PublicacionInterfaces {}

export const Publicacion = sequelize.define<PublicacionModel>(
  "publicaciones",
  {
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contenido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    f_publicacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    cantidad_likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    cantidad_dislikes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    cantidad_comentarios: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
  }
);

Publicacion.belongsTo(Usuario, {
  foreignKey: "user_id",
});
