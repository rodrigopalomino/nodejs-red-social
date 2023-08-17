import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import { Publicacion } from "./publicacionModel";
import { Usuario } from "./usuarioModel";
import { Like as LikeInterfaces } from "../interfaces/likeInterfaces";

export interface LikeModel extends Model<LikeInterfaces>, LikeInterfaces {}

export const Like = sequelize.define<LikeModel>(
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
