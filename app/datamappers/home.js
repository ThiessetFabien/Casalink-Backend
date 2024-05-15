import client from "./connexion";

const homeDataMapper = {

// ----------- FIND HOME -----------

  // Find all the Homes
  async findAllHome(){
    
    try {
    
      const result = await client.query('SELECT * FROM "home";');
      
      return result.rows;
    
    } catch (error) {
      console.error('Erreur lors de la recherche des foyers:', error);
      throw error;
    }
  },

  // Find a home by its id
  async findHomeById(id){
    
    try {
    
      if (!id) {
        throw new Error('L\'identifiant du foyer est manquant.');
      }

      const result = await client.query('SELECT * FROM "home" WHERE id=$1;', [id]);
    
      return result.rows[0];
    
    } catch (error) {
    console.error('Erreur lors de la recherche du foyer par ID :', error);
    throw error;
    }
  },

  // Find a home by its user_id
  async findHomeByUserId(user_id){
      
    try {
    
      if (!user_id) {
        throw new Error('L\'identifiant du user est manquant.');
      }

      const result = await client.query('SELECT * FROM "home" JOIN "user" ON "user".home_id = "home".id WHERE "user".id=$1;', [user_id]);
    
      return result.rows[0];
    
    } catch (error) {
    console.error('Erreur lors de la recherche du foyer par user ID :', error);
    throw error;
    }
  },


  // ----------- CREATE HOME -----------

  // Create a new home
  async createHome(homeData) {

    try {
      
      if (!homeData) {
        throw new Error('Les données du foyer sont manquantes.');
      }

      const { shopping_list, name } = homeData;
      
      const result = await client.query(
        'INSERT INTO "home" (shopping_list, name) VALUES ($1, $2) RETURNING *;',
        [shopping_list, name]
      );

      return result.rows[0];
    
    } catch (error) {
      console.error('Erreur lors de la création d\'un foyer :', error);
      throw error;
    }
  },

  // ----------- UPDATE HOME -----------

  async updateHome(id, homeData) {
    try {

      if (!id || !homeData) {
        throw new Error('Les données du foyer ou l\'identifiant sont manquants.');
      }

      const { shopping_list, name } = homeData;
      
      const result = await client.query(
        'UPDATE "home" SET shopping_list = $1, name = $2 WHERE id = $3 RETURNING *;',
        [shopping_list, name, id]
      );

      return result.rows[0];
    
    } catch (error) {
      console.error('Erreur lors de la modification du foyer :', error);
      throw error;
    }
  },


  // ----------- DELETE HOME -----------

  // Delete a home by its id
  async deleteHomeById(id) {

    try {

      if (!id) {
        throw new Error('L\identifiant du foyer est manquant.');
      }

      await client.query('DELETE FROM "home" WHERE id = $1;', [id]);
      return true;
    
    } catch (error) {
      console.error('Erreur lors de la suppression du foyer par son ID :', error);
      throw error;
    }
  }
}

export default homeDataMapper;