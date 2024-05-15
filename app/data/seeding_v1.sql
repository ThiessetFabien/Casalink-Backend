-- Insertion of homes
INSERT INTO "home" ("shopping_list", "name")
VALUES
    ('{"item1", "item2", "item3"}', 'Home 1'),
    ('{"item4", "item5"}', 'Home 2');

-- Insertion of users
INSERT INTO "user" ("email", "firstname", "lastname", "birthdate", "role", "pin", "score", "password", "home_id")
VALUES
    ('user1@example.com', 'Patrick', 'Doe', '1990-05-15', 'adult', '1234', 100, 'password1', '1'),
    ('user2@example.com', 'milo', 'Smith', '1995-08-25', 'adult', '5678', 80, 'password2', '2'),
    ('admin@example.com', 'mila', 'User', '1985-02-10', 'child', '9876', 200, 'adminpassword', '1');

-- Insertion of addresses
INSERT INTO "address" ("street", "city", "additionnal_information", "postal_code", "country")
VALUES
    ('123 Main St', 'Cityville', 'Apartment 1A', '13100', 'France'),
    ('456 Elm St', 'Townsville', NULL, '06200', 'France'),
    ('789 Oak St', 'Villagetown', 'Suite 100', '67890', 'France');

-- Insertion of categories
INSERT INTO "category" ("name", "color")
VALUES
    ('Category 1', 'blue'),
    ('Category 2', 'green'),
    ('Category 3', 'red');

-- Insertion of tasks
INSERT INTO "task" ("name", "start_date", "end_date", "reward_point", "priority", "status", "description", "category_id")
VALUES
    ('Faire à manger', '2024-06-25 11:10:10+02:00','2024-06-25 12:10:12+02:00', 10, 'high', 'A Faire', 'Description de la tâche 1', 1),
    ('Faire ménage', '2024-06-26 11:10:10+02:00', '2024-06-26 12:10:12+02:00', 20, 'medium', 'En Cours', 'Description de la tâche 2', 2),
    ('Task 3', '2024-06-27 11:10:10+02:00', '2024-06-27 12:10:12+02:00', 15, 'low', 'Terminée', 'Description de la tâche 3', 3);


-- Insertion of subtasks
INSERT INTO "subtask" ("description", "name", "task_id")
VALUES
    ('Description de la sous-tâche 1', 'Subtask 1', 1),
    ('Description de la sous-tâche 2', 'Subtask 2', 2),
    ('Description de la sous-tâche 3', 'Subtask 3', 3);

-- Insertion of links between users and tasks
INSERT INTO "user_has_task" ("user_id", "task_id")
VALUES
    (1, 1),
    (2, 2),
    (1, 3);

-- Insertion of links between users and address
INSERT INTO "user_has_address" ("user_id", "address_id")
VALUES
    (1, 1),
    (2, 2),
    (3, 3);

-- Insertion of budgets
INSERT INTO "budget" ("amount", "name", "category", "description", "home_id")
VALUES
    (1000, 'Budget 1', 'Category 1', 'Description du budget 1', 1),
    (2000, 'Budget 2', 'Category 2', 'Description du budget 2', 2),
    (3000, 'Budget 3', 'Category 3', 'Description du budget 3', 1);
