import pool from "./connexion.js";
import DbError from "../errors/dbError.js";

const profilDataMapper = {

// ----------- FIND profile -----------
  // Find a profile by its id
  async findProfileById(id){
    try {
      const result = await pool.query('SELECT * FROM "profile" WHERE id=$1;', [id]);
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // Find a profile by its account_id
  async findProfileByAccountId(account_id){
    try {
      const result = await pool.query('SELECT id, name, TO_CHAR(birthdate, \'YYYY-MM-DD\') AS birthdate, role, pin, score, image, email, account_id, created_at, updated_at FROM "profile" WHERE account_id = $1 ORDER BY "name" ASC;', [account_id]);

      console.log('date apres traitement de la query', result.rows);
      return result.rows;
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  async findTaskByProfileId(id){
    try {
      // Get the role of the profile
      const { rows: [{ role }] } = await pool.query('SELECT role FROM "profile" WHERE id = $1', [id]);

      let query = '';
      if (role === 'child') {
        // If the role is 'child', select only the tasks of the child
        query = `
          SELECT 
            prof.id AS profile_id,
            prof.name AS profile_name,
            tsk.id AS task_id,
            tsk.name AS task_name,
            tsk.start_date AS task_start_date,
            tsk.end_date AS task_end_date,
            tsk.reward_point AS task_reward_point,
            tsk.priority AS task_priority,
            tsk.status AS task_status,
            tsk.description AS task_description
          FROM 
              "profile" prof
          JOIN 
              "profile_has_task" pht ON prof.id = pht.profile_id
          JOIN 
              "task" tsk ON pht.task_id = tsk.id
          WHERE 
              prof.id = $1 AND prof.role = 'child';
        `;
      } else {
        // If the role is 'adult', select all the tasks of the profile and its children
        query = `
        SELECT 
        prof.id AS profile_id,
        prof.name AS profile_name,
        tsk.id AS task_id,
	@@ -64,15 +93,27 @@ const taskDataMapper = {
        tsk.priority AS task_priority,
        tsk.status AS task_status,
        tsk.description AS task_description
    FROM 
        "profile" prof
    JOIN 
        "profile_has_task" pht ON prof.id = pht.profile_id
    JOIN 
        "task" tsk ON pht.task_id = tsk.id
    WHERE 
        prof.id = $1
    OR 
        prof.id IN 
        (SELECT profile_id 
            FROM "profile_has_task" 
              WHERE profile_id = $1 
        AND EXISTS 
        (SELECT 1 
            FROM "profile" 
              WHERE role = 'child' 
        AND "account_id" = prof."account_id"));`;
      }

      const result = await pool.query(query, [id]);
      return result.rows;
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // Find a profile by its home_id
  async findProfileByHomeId(home_id){
    try {
      if (!home_id) {
        throw new Error('L\'identifiant du foyer est manquant.');
      }
      const result = await pool.query('SELECT * FROM "profile" JOIN "account" ON "profile".account_id = "account".id WHERE "account".home_id = $1;', [home_id]);
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- CREATE PROFILE -----------

  // Create a new profile
  async createProfile(profileData) {
    try {
        const { name, pin, score, birthdate, image, email, account_id, role } = profileData;
        const result = await pool.query(
          `INSERT 
            INTO "profile" (name, pin, score, birthdate, image, email, account_id, role)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;`,
            [name, pin, score, birthdate, image, email, account_id, role]
        );

      return result.rows[0];
    } catch (error) {
        throw new DbError(error.message);
    }
},
  // ----------- UPDATE PROFILE -----------
  async updateProfile(id, profileData) {
    try {
        if (!id || !profileData) {
            throw new Error('Les données du profil ou l\'identifiant sont manquants.');
        }
        const { name, role, pin, score, birthdate, image, email, account_id } = profileData;
        const query = `
            UPDATE "profile" 
            SET name = $1, role = $2, pin = $3, score = $4, birthdate = $5, image = $6, email = $7, account_id = $8, updated_at = NOW()
            WHERE id = $9 
            RETURNING *;
        `;
        const values = [name, role, pin, score, birthdate, image, email, account_id, id];
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            throw new Error('Aucun profil trouvé avec cet ID.');
        }
        return result.rows[0];
    } catch (error) {
        throw new DbError(error.message);
    }
},


  // ----------- DELETE PROFIL -----------
  // Delete a profile by its id
  async deleteProfileById(id) {
    try {
      if (!id) {
        throw new Error('L\'identifiant du profil est manquant.');
      }
      await pool.query('DELETE FROM "profile" WHERE id = $1;', [id]);
      return true;
    } catch (error) {
      throw new DbError(error.message);
    }
  }
}

export default profilDataMapper;