-- Revert casalink:init_bdd from pg

BEGIN;

DROP TABLE IF EXISTS "budget", "subtask", "task", "category", "address", "profile", "user", "home" CASCADE;

COMMIT;
