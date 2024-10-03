import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import { ProductTranslation } from "./productTranslation";
import { ProductType } from "./productType";

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
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    image_url_small: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    image_url_full: {
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
  foreignKey: "product_id"
});

Product.belongsTo(ProductType, {
  foreignKey: "product_type_id"
});
