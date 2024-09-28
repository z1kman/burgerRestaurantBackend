import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import { ProductTranslation } from "./productTranslation";

export class Product extends Model {}
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    product_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "product_type",
        key: "id",
      },
      onUpdate: "NO ACTION",
      onDelete: "CASCADE",
    },
    default_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "product",
    timestamps: false,
    sequelize,
  }
);

Product.hasMany(ProductTranslation, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE'
});