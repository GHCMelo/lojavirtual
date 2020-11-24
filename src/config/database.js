const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// ==> Conexão com a Base de Dados:
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('Conexão no banco de dados realizado com êxito!');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
