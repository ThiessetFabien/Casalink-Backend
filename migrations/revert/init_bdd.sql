-- Revert casalink:init_bdd from pg

BEGIN;

DROP TABLE "budget", "subtask", "home", "task", "category", "address", "user";

COMMIT;
