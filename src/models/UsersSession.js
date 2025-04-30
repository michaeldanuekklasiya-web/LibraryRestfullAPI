import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const UsersSession = sequelize.define(
  "UsersSession",
  {
    session_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    expired_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "users_sessions",
    underscored: true,
  }
);

UsersSession.belongsTo(User, { foreignKey: "user_id" });

export default UsersSession;
