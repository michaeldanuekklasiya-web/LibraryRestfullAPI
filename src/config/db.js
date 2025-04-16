import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,       
  process.env.DB_USER,       
  process.env.DB_PASSWORD,   
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIAL,
  }
);

// Cek koneksi
(async () => {
    try {
      await sequelize.authenticate();
      console.log('✅ Koneksi ke database berhasil!');
    } catch (error) {
      console.error('❌ Gagal terkoneksi ke database:', error.message);
    }
  })();
  

export default sequelize;