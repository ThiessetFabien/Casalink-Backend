-- Verify casalink:init_bdd

BEGIN;

SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'budget'
) AS "budget_exists";


SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'subtask'
) AS "subtask_exists";

SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'home'
) AS "home_exists";

SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'task'
) AS "task_exists";

SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'category'
) AS "category_exists";

SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'address'
) AS "address_exists";

SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'user'
) AS "user_exists";