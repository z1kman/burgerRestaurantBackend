import { DataTypes, Model } from "sequelize";
import { User } from "./user";
import { sequelize } from "../database";

// Интерфейс атрибутов таблицы wallet
interface WalletAttributes {
  id: number;
  user_id: string; // UUID как строка
  points: number;
}


export class Wallet extends Model<WalletAttributes> implements WalletAttributes {
  public id!: number;
  public user_id!: string;
  public points!: number;
}

Wallet.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: User,
        key: "id",
      },
    },
    points: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    sequelize,
    tableName: "wallet",
    timestamps: false,
  }
);


