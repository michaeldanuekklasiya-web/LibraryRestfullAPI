import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const RefreshToken = sequelize.define('RefreshToken', {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
    unique: true
  },
}, {
  tableName: 'refresh_tokens',
  underscored: true,
});

export default RefreshToken;