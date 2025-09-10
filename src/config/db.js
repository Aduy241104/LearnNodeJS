const { Pool } = require("pg");
const path = require("path");
const envPath = require("dotenv");

envPath.config({ path: path.resolve(__dirname, "../../.env") })

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// Test kết nối
pool.connect()
    .then(() => console.log("✅ Kết nối PostgreSQL thành công"))
    .catch(err => console.error("❌ Lỗi kết nối DB:", err));

module.exports = pool;
