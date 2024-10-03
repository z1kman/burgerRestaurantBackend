import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import { ProductTranslation } from "./productTranslation";
import { ProductType } from "./productType";
import { NotificationTranslation } from "./notificationTranslation";

export class NotificationModel extends Model {}
NotificationModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    }
  },
  {
    tableName: "notification",
    timestamps: false,
    sequelize,
  }
);

NotificationModel.hasMany(NotificationTranslation, {
  foreignKey: "notification_id"
});
