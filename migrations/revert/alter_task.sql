-- Revert casalink:alter_task from pg

BEGIN;

ALTER TABLE "task"
    DROP COLUMN "account_id";

COMMIT;
