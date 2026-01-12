import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "hopper.proxy.rlwy.net",
  port: 16125,
  user: "root",
  password: "blrrNXtIFrEpCPDkteoKuqwuNHufpvvh",
  database: "railway",
});
