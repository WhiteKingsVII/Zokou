// Importez dotenv et chargez les variables d'environnement depuis le fichier .env
require("dotenv").config();

const { Pool } = require("pg");

// Utilisez le module 'set' pour obtenir la valeur de DATABASE_URL depuis vos configurations
const s = require("../set");

// Récupérez l'URL de la base de données de la variable s.DATABASE_URL
var dbUrl=s.DATABASE_URL?s.DATABASE_URL:"postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9"
const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

// Créez une pool de connexions PostgreSQL
const pool = new Pool(proConfig);

// Fonction pour créer la table "alive" avec une colonne "id"
const creerTablenorth1🔷 = async () => {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS north1🔷 (
          id serial PRIMARY KEY,
          message text,
          lien text
        );
      `);
      console.log("La table 'north1🔷' a été créée avec succès.");
    } catch (e) {
      console.error("Une erreur est survenue lors de la création de la table 'north1🔷':", e);
    }
  };
  
  // Appelez la méthode pour créer la table "north1🔷"
  creerTablenorth1🔷();

// Fonction pour ajouter ou mettre à jour un enregistrement dans la table "north1🔷"
async function addOrUpdateDataInnorth1🔷(message, lien) {
    const client = await pool.connect();
    try {
      // Insérez ou mettez à jour les données dans la table "north1🔷"
      const query = `
        INSERT INTO north1🔷 (id, message, lien)
        VALUES (1, $1, $2)
        ON CONFLICT (id)
        DO UPDATE SET message = excluded.message, lien = excluded.lien;
      `;
      const values = [message, lien];
  
      await client.query(query, values);
      console.log("Données ajoutées ou mises à jour dans la table 'north1🔷' avec succès.");
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la mise à jour des données dans la table 'north1// Importez dotenv et chargez les variables d'environnement depuis le fichier .env
require("dotenv").config();

