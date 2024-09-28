import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export class ProductType extends Model {}
ProductType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "product_type",
    timestamps: false,
    sequelize,
  }
);
