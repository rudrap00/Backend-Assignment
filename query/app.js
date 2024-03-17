import pool from "../db.js";

export const getTotalPrice = async (...args) => {
  const result = await pool.query(
    `select base_distance_in_km, fix_price, km_price from pricing where zone = $1 and organization_id = $2`,
    [...args]
  );

  return result.rows[0];
};
