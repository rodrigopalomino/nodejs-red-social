import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Publicacion } from "./publicacionModel";
import { Usuario } from "./usuarioModel";

export const Like = sequelize.define(
  "likes",
  {
    like_id: {
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
  },
  {
    freezeTableName: true,
  }
);

Like.belongsTo(Publicacion, {
  foreignKey: "post_id",
});

Like.belongsTo(Usuario, {
  foreignKey: "user_id",
});
