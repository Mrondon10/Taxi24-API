require('dotenv').config(); 
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'postgres',
});

async function createDatabase() {
  try {
    await client.connect();
    console.log(`Conectado a PostgreSQL en ${process.env.DB_HOST}:${process.env.DB_PORT}`);

    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_DATABASE}'`);
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${process.env.DB_DATABASE}"`);
      console.log(`Base de datos ${process.env.DB_DATABASE} creada exitosamente.`);
    } else {
      console.log(`La base de datos ${process.env.DB_DATABASE} ya existe.`);
    }
  } catch (err) {
    console.error(`Error al crear la base de datos: ${err.message}`);
  } finally {
    await client.end();
    console.log("Conexión cerrada.");
  }
}

createDatabase();
