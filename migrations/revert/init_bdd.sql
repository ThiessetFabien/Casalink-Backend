-- Revert casalink:init_bdd from pg

BEGIN;

DROP TABLE "budget", "subtask", "task", "category", "address", "profile", "user", "home" CASCADE;

COMMIT;
