-- Revert casalink:alter_task from pg

BEGIN;

    DROP COLUMN "account_id";

COMMIT;
