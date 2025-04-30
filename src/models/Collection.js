import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import Book from "./Book.js";

const Collection = sequelize.define(
  "Collection",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "collections",
    timestamps: false,
  }
);

Collection.belongsTo(Book, {
  foreignKey: "book_id",
  as: "book",
});

export default Collection;
