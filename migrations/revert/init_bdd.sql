-- Revert casalink:init_bdd from pg

BEGIN;

DROP TABLE IF EXISTS "budget", "subtask", "task", "category", "address", "profile", "account", "home" CASCADE;

COMMIT;
