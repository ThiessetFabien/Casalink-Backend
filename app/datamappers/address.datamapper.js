/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable import/extensions */
import pool from './connexion.js';
import DbError from '../errors/dbError.js';

const addressDataMapper = {

  // ----------- FIND ADDRESS -----------

  async findAllAddress() {
    try {
      const result = await pool.query(
        `SELECT * 
          FROM "address";
      `,
      );
      return result.rows;
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  async findAddressById(id) {
    try {
      const result = await pool.query(
        `SELECT * 
          FROM "address" 
            WHERE id=$1;`,
        [id],
      );
      return result.rows;
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  async findAddressByAccountId(user_id) {
    try {
      const result = await pool.query(
        `SELECT 
          DISTINCT "address".* 
            FROM "address" 
          JOIN "user_has_address" ON "user_has_address".address_id = "address".id
            WHERE "user_has_address".user_id = $1;`,
        [user_id],
      );
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  async findAddressByHomeId(home_id) {
    try {
      const result = await pool.query(
        `SELECT DISTINCT
        h.name AS home_name,
        a.email AS account_email,
        ad.street,
        ad.city,
        ad.additional_information,
        ad.postal_code,
        ad.country
      FROM 
          "home" h
      JOIN 
          "account" a ON h.id = a.home_id
      JOIN 
          "account_has_address" aha ON a.id = aha.account_id
      JOIN 
          "address" ad ON aha.address_id = ad.id
      WHERE 
        h.id = $1;`,
        [home_id],
      );
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- CREATE ADDRESS -----------

  async createAddress(addressData) {
    try {
      const {
        street, city, additional_information, postal_code, country,
      } = addressData;
      const result = await pool.query(
        `INSERT INTO "address" 
          (street, city, additional_information, postal_code, country) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
        [street, city, additional_information, postal_code, country],
      );
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- UPDATE ADDRESS -----------
  async updateAddress(id, addressData) {
    try {
      const {
        street, city, additional_information, postal_code, country,
      } = addressData;
      const result = await pool.query(
        `UPDATE "address" 
          SET street = $1, 
          city = $2, additional_information = $3, 
          postal_code = $4, 
          country = $5 
        WHERE id = $6 RETURNING *;`,
        [street, city, additional_information, postal_code, country, id],
      );
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- DELETE address -----------
  async deleteAddressById(id) {
    try {
      const result = await pool.query(
        `DELETE
           FROM "address" 
          WHERE id = $1;`,
        [id],
      );
      console.log('result deleteAddressById', result.rows);
      return result.rows;
    } catch (error) {
      throw new DbError(error.message);
    }
  },
};

export default addressDataMapper;
