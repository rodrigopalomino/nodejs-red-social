import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import { Publicacion } from "./publicacionModel";
import { Usuario } from "./usuarioModel";
import { Like as LikeInterfaces } from "../interfaces/likeInterfaces";

export interface DislikeModel extends Model<LikeInterfaces>, LikeInterfaces {}

export const Dislike = sequelize.define<DislikeModel>(
  "dislikes",
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

Dislike.belongsTo(Publicacion, {
  foreignKey: "post_id",
});

Dislike.belongsTo(Usuario, {
  foreignKey: "user_id",
});
