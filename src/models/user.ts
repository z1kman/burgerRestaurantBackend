import { Model } from "sequelize";
const { DataTypes } = require("sequelize");
import { sequelize } from "../database";
import { Wallet } from "./wallet";

interface UserAttributes {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public username!: string;
  public first_name!: string;
  public last_name!: string;
  public password!: string;
}
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Генерация UUID с помощью встроенного в Sequelize UUIDV4
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "user",
    timestamps: false,
    sequelize,
  }
);

User.hasOne(Wallet, { foreignKey: 'user_id' });