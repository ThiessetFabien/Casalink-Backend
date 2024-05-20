-- Insérer des foyers (homes)
INSERT INTO "home" ("name", "shopping_list", "created_at", "updated_at")
VALUES ('Maison principale', ARRAY['lait', 'pain', 'œufs'], NOW(), NOW()),
       ('Maison de vacances', ARRAY['jouets de plage', 'crème solaire'], NOW(), NOW());

-- Insérer des utilisateurs (users)
INSERT INTO "user" ("email", "firstname", "lastname", "role", "password", "home_id", "created_at", "updated_at")
VALUES ('user123@example.com', 'John', 'Doe', 'user', 'password123', 1, NOW(), NOW()),
       ('user2877847@example.com', 'Jane', 'Doe', 'user', 'password456', 1, NOW(), NOW()),
       ('admin89@example.com', 'Admin', 'Admin', 'admin', 'adminpassword', 1, NOW(), NOW());

-- Insérer des profils (profiles)
INSERT INTO "profile" ("name", "birthdate", "role", "pin", "score", "image", "user_id", "created_at", "updated_at")
VALUES ('Profil John', '1990-05-15', 'adult', '1234', 100, 'https://example.com/john.jpg', 1, NOW(), NOW()),
       ('Profil Jane', '1992-08-20', 'adult', '5678', 150, 'https://example.com/jane.jpg', 2, NOW(), NOW());

-- Insérer des adresses (addresses)
INSERT INTO "address" ("street", "city", "additional_information", "postal_code", "country", "created_at", "updated_at")
VALUES ('123 rue de la Paix', 'Paris', NULL, '75001', 'France', NOW(), NOW()),
       ('456 Main Street', 'New York', 'Apt. 202', '10001', 'USA', NOW(), NOW());

-- Insérer des catégories (categories)
INSERT INTO "category" ("name", "color", "created_at", "updated_at")
VALUES ('Courses', 'RGB(210, 144, 20)', NOW(), NOW()),
       ('Loisirs', 'RGB(210, 110, 80)', NOW(), NOW()),
       ('Travail', 'RGBA(210, 144, 200, 0.8)', NOW(), NOW());

-- Insérer des tâches (tasks)
INSERT INTO "task" ("name", "start_date", "end_date", "reward_point", "priority", "status", "description", "category_id", "created_at", "updated_at")
VALUES ('Faire les courses', '2024-05-25 00:00:00+02', '2024-05-25 01:00:00+02', 50, 'Haute', 'A Débuter', 'Acheter des produits alimentaires', 1, NOW(), NOW()),
       ('Sortie à la plage', '2024-05-26 00:00:00+02', '2024-05-27 00:00:00+02', NULL, 'Moyenne', 'A Débuter', 'Aller à la plage pour se détendre', 2, NOW(), NOW());

-- Insérer des sous-tâches (subtasks)
INSERT INTO "subtask" ("name", "description", "task_id", "created_at", "updated_at")
VALUES ('Acheter du lait', 'Prendre du lait demi-écrémé', 1, NOW(), NOW()),
       ('Jouer au frisbee', 'Amener un frisbee à la plage', 2, NOW(), NOW());

-- Insérer des associations entre utilisateurs et tâches (user_has_task)
INSERT INTO "user_has_task" ("user_id", "task_id", "created_at", "updated_at")
VALUES (1, 1, NOW(), NOW()),
       (2, 2, NOW(), NOW());

-- Insérer des associations entre utilisateurs et adresses (user_has_address)
INSERT INTO "user_has_address" ("user_id", "address_id", "created_at", "updated_at")
VALUES (1, 1, NOW(), NOW()),
       (2, 2, NOW(), NOW());

-- Insérer des budgets (budgets)
INSERT INTO "budget" ("amount", "name", "category", "description", "home_id", "created_at", "updated_at")
VALUES (100.00, 'Courses hebdomadaires', 'Courses', 'Budget alloué pour les courses alimentaires de la semaine', 1, NOW(), NOW()),
       (50.00, 'Loisirs mensuels', 'Loisirs', 'Budget pour les activités de loisirs du mois', 1, NOW(), NOW());
