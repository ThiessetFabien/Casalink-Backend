-- Revert casalink:init_bdd from pg

BEGIN;

DROP TABLE "budget", "subtask", "task", "category", "address", "user", "home" CASCADE;

COMMIT;
