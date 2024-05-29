-- Deploy casalink:alter_task to pg

BEGIN;

ALTER TABLE "task"
    ADD COLUMN "account_id" INT REFERENCES "account"("id") ON DELETE CASCADE;
COMMIT;
