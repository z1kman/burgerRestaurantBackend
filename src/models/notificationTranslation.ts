import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import { Language } from "./language";

export class NotificationTranslation extends Model {}
NotificationTranslation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    notification_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "notification",
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "notification_translation",
    indexes: [
      {
        unique: true,
        fields: ["notification_id", "language_id"],
      },
    ],

  }
);

NotificationTranslation.belongsTo(Language, { foreignKey: "language_id" });

