import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import { Usuario as UsuarioInterfaces } from "../interfaces/usuario";

export interface UsuarioModel
  extends Model<UsuarioInterfaces>,
    UsuarioInterfaces {}

export const Usuario = sequelize.define<UsuarioModel>(
  "usuarios",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    f_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
