import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import { Language } from "./language";

export class ProductTranslation extends Model {}
ProductTranslation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "product",
        key: "id",
      },
      onUpdate: "NO ACTION",
      onDelete: "CASCADE",
    },
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "language",
        key: "id",
      },
      onUpdate: "NO ACTION",
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    short_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    long_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "product_translation",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["product_id", "language_id"],
      },
    ],
    sequelize,
  }
);

ProductTranslation.belongsTo(Language, { foreignKey: "language_id" });
