import pool from "./connexion.js";
import DbError from "../errors/dbError.js";

const addressDataMapper = {

// ----------- FIND ADDRESS -----------

  // Find all the Addresses
  async findAllAddress(){
    
    try {
    
      const result = await pool.query('SELECT * FROM "address";');
      
      return result.rows;
    
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // Find a address by its id
  async findAddressById(id){
    try {
      if (!id) {
        throw new Error('L\'identifiant de l\'adresse est manquant.');
      }
      const result = await pool.query('SELECT * FROM "address" WHERE id=$1;', [id]);
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // Find a address by its user_id
  async findAddressByUserId(user_id){
    try {
      if (!user_id) {
        throw new Error('L\'identifiant du user est manquant.');
      }
      const result = await pool.query('SELECT DISTINCT "address".* FROM "address" JOIN "user_has_address" ON "user_has_address".address_id = "address".id WHERE "user_has_address".user_id = $1;', [user_id]);
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // Find a address by its home_id
  async findAddressByHomeId(home_id){
    try {
      if (!home_id) {
        throw new Error('L\'identifiant du user est manquant.');
      }
      const result = await pool.query('SELECT "address".* FROM "home" JOIN "user" ON "user".home_id = "home".id JOIN "user_has_address" ON "user_has_address".user_id = "user".id JOIN "address" ON "address".id = "user_has_address".address_id WHERE "home".id = $1;', [home_id]);
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- CREATE ADDRESS -----------

  // Create a new address
  async createAddress(addressData) {
    try {
      
      if (!addressData) {
        throw new Error('Les données de l\'adresse sont manquantes.');
      }
      const { street, city, additional_information, postal_code, country } = addressData;
      
      const result = await pool.query(
        'INSERT INTO "address" (street, city, additional_information, postal_code, country) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
        [street, city, additional_information, postal_code, country]
      );
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- UPDATE ADDRESS -----------
  async updateAddress(id, addressData) {
    try {
      if (!id || !addressData) {
        throw new Error('Les données de l\'adresse ou l\'identifiant sont manquants.');
      }
      const { street, city, additional_information, postal_code, country } = addressData;
      
      const result = await pool.query(
        'UPDATE "address" SET street = $1, city = $2, additional_information = $3, postal_code = $4, country = $5 WHERE id = $6 RETURNING *;',
        [street, city, additional_information, postal_code, country, id]
      );
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- DELETE address -----------
  // Delete a address by its id
  async deleteAddressById(id) {
    try {
      if (!id) {
        throw new Error('L\'identifiant de l\'adresse est manquant.');
      }
      await pool.query('DELETE FROM "address" WHERE id = $1;', [id]);
      return true;
    
    } catch (error) {
      throw new DbError(error.message);
    }
  }
}

export default addressDataMapper;