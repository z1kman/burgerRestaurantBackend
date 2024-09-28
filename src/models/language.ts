import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export class Language extends Model {}
Language.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
  },
  {
    tableName: "language",
    timestamps: false,
    sequelize,
  }
);

