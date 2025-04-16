import { DataTypes } from "sequelize";
import './config/db.js';
import sequelize from "../config/db.js";

const Book = sequelize.define('Book', {
    'id': {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.literal('nextval("Book")') // menggunakan sequence sesuai gambar
    },
    'title': {
      type: DataTypes.TEXT,
      allowNull: false
    },
    'author': {
      type: DataTypes.TEXT,
      allowNull: false
    },
    'date': {
      type: DataTypes.DATE,
      allowNull: true
    },
    'category': {
      type: DataTypes.TEXT,
      allowNull: true
    },
    'image': {
      type: DataTypes.TEXT,
      allowNull: true
    },
    'description': {
      type: DataTypes.TEXT,
      allowNull: true
    },
    'publisher': {
      type: DataTypes.TEXT,
      allowNull: true
    },
    'year_published': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    'page_count': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    'format': {
      type: DataTypes.TEXT,
      allowNull: true
    },
    'doi': {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'books',
    timestamps: false // jika tidak ada kolom createdAt dan updatedAt
  });