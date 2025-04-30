import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const UsersSession = sequelize.define("UsersSession", {
  session_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
}, {
  tableName: "users_sessions",
  underscored: true,
});

export default UsersSession;