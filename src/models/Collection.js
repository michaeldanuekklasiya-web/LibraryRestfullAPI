import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Book from "./Book.js"; // Pastikan Book diimpor dengan benar

const Collection = sequelize.define(
  "Collection",
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
    tableName: "collections",
    timestamps: false,
  }
);

// Relasi dengan model Book
Collection.belongsTo(Book, {
  foreignKey: "book_id",
  as: "book",
});

export default Collection;
