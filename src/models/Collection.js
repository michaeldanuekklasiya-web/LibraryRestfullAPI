import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Collection = sequelize.define(
  "Collection", // Nama model menggunakan CamelCase
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "collections", // Nama tabel di database
    timestamps: false,
  }
);

export default Collection;
