-- Verify casalink:alter_task on pg

BEGIN;

 SELECT 1
    FROM information_schema.columns 
    WHERE table_name='task' AND column_name='account_id'
    
ROLLBACK;
