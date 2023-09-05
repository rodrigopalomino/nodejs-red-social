import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import { Usuario } from "./usuarioModel";
import { General as GeneralInterfaces } from "../interfaces/general";

export interface GeneralModel
  extends Model<GeneralInterfaces>,
    GeneralInterfaces {}

export const General = sequelize.define<GeneralModel>(
  "generales",
  {
    general_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    contenido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

General.belongsTo(Usuario, {
  foreignKey: "user_id",
});
