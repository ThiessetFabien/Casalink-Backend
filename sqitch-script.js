import dotenv from 'dotenv';
import { exec } from 'child_process';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Récupérer les variables d'environnement nécessaires
const { PGUSER, PGPASSWORD, PGDATABASE } = process.env;

if (!PGUSER || !PGPASSWORD || !PGDATABASE) {
  console.error('Les variables d\'environnement PGUSER, PGPASSWORD et PGDATABASE doivent être définies.');
  process.exit(1);
}

// Fonction pour exécuter une commande shell
const execShellCommand = (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
        reject(stderr);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
};

// Commandes à exécuter
const commands = [
  `sqitch revert -y`,
  `sqitch deploy init_bdd`,
  `psql -d ${PGDATABASE} -f ./app/data/seeding_v1.sql`
];

// Exécution des commandes séquentiellement
const runCommands = async () => {
  for (const cmd of commands) {
    try {
      const output = await execShellCommand(cmd);
      console.log(output);
    } catch (error) {
      console.error(`Erreur lors de l'exécution de la commande : ${cmd}`);
      console.error(error);
      process.exit(1);
    }
  }
};

runCommands();
