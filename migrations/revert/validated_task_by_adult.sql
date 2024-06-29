-- Revert casalink:validated_task_by_adult from pg

BEGIN;

ALTER TABLE profile_has_task
DROP COLUMN validated_by_adult;

COMMIT;