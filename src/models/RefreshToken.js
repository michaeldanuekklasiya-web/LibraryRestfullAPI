import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const RefreshToken = sequelize.define(
  "RefreshToken",
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    tableName: "refresh_tokens",
    underscored: true,
  }
);

RefreshToken.belongsTo(User, { foreignKey: "userId" });

export default RefreshToken;
