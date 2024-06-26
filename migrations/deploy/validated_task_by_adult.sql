-- Deploy casalink:validated_task_by_adult to pg

BEGIN;

ALTER TABLE profile_has_task
ADD COLUMN validated_by_adult BOOLEAN DEFAULT FALSE,
ADD COLUMN validated_by_child BOOLEAN DEFAULT FALSE;

COMMIT;