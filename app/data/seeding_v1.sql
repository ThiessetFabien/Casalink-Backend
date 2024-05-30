-- Insérer des foyers (homes)
INSERT INTO "home" ("name", "shopping_list", "created_at", "updated_at")
VALUES 
    ('Maison principale', ARRAY['lait', 'pain', 'œufs'], NOW(), NOW()),
    ('Maison de vacances', ARRAY['jouets de plage', 'crème solaire'], NOW(), NOW());

-- Insert accounts ensuring home_id values are correct
INSERT INTO "account" ("email", "firstname", "lastname", "role", "password", "home_id", "created_at", "updated_at")
VALUES 
    ('totot@gmail.com', 'toto', 'ppo', 'user', 'Totott#123', 1, NOW(), NOW()),
    ('tatat@gmail.com', 'tata', 'ppa', 'admin', 'Totott#123', 1, NOW(), NOW()),
    ('titit@gmail.com', 'titi', 'ppa', 'user', 'Totott#123', 2, NOW(), NOW()), -- Changed from 3 to 2
    ('test@test.com', 'test', 'test', 'user', '$2b$08$ZvoGus9T9eYHAzlsBVheI.kZy0EmUVCvGSMwO.CAlcr44bQ1S4E6y', 2, NOW(), NOW());

-- Insert profiles ensuring account_id values are correct
INSERT INTO "profile" ("name", "birthdate", "role", "pin", "score", "image", "email", "account_id", "created_at", "updated_at")
VALUES 
    ('Profil John', '1990-05-15', 'adult', '1234', 100, 'https://example.com/john.jpg', 'user564@example.com', 1, NOW(), NOW()),
    ('Profil Jane', '1992-08-20', 'adult', '5678', 150, 'https://example.com/jane.jpg', 'user852@example.com', 1, NOW(), NOW()),
    ('Profil Jiuiuane', '1992-08-21', 'adult', '5678', 150, 'https://example.com/jane.jpg', 'user855252@example.com', 1, NOW(), NOW()),
    ('Profil Test', '1992-08-21', 'adult', '5678', 150, 'https://example.com/jane.jpg', 'user@example.com', 3, NOW(), NOW()), -- Changed from 4 to 3
    ('Priuytrezest', '1992-08-21', 'adult', '5678', 150, 'https://example.com/jane.jpg', 'use5r@example.com', 3, NOW(), NOW()); -- Changed from 4 to 3

-- Continue with other insertions as before


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
INSERT INTO "task" ("name", "start_date", "end_date", "reward_point", "priority", "status", "description", "category_id", "account_id", "created_at", "updated_at")
VALUES 
  ('Faire les courses', '2024-05-25 00:00:00+02', '2024-05-25 01:00:00+02', 50, 'Haute', 'A Débuter', 'Acheter des produits alimentaires', 1, 1, NOW(), NOW()),
  ('Faire à manger', '2024-05-26 12:30:00+02', '2024-05-27 14:00:00+02', 50, 'Basse', 'A Débuter', 'blablabla', 1, 2, NOW(), NOW()),
  ('Faire une application', '2024-05-27 12:00:00+02', '2024-05-27 13:00:00+02', 50, 'Basse', 'A Débuter', 'blablabla', 1, 3, NOW(), NOW()),
  ('Presentation du projet', '2024-05-29 10:00:00+02', '2024-05-29 11:00:00+02', 50, 'Basse', 'A Débuter', 'blablabla', 1, 4, NOW(), NOW()),
  ('Macdo et burger king', '2024-05-29 12:00:00+02', '2024-05-29 14:00:00+02', 50, 'Basse', 'A Débuter', 'blablabla', 1, 4, NOW(), NOW()),
  ('Faire b', '2024-05-29 09:00:00+02', '2024-05-29 10:00:00+02', 50, 'Basse', 'A Débuter', 'blablabla', 1, 4, NOW(), NOW()),
  ('Faire c', '2024-05-27 09:00:00+02', '2024-05-27 10:00:00+02', 50, 'Basse', 'A Débuter', 'blablabla', 1, 4, NOW(), NOW()),
  ('Faire d', '2024-05-26 09:00:00+02', '2024-05-26 10:00:00+02', 50, 'Basse', 'A Débuter', 'blablabla', 1, 4, NOW(), NOW()),
  ('Faire g', '2024-05-28 09:00:00+02', '2024-05-28 10:00:00+02', 50, 'Basse', 'A Débuter', 'blablabla', 1, 4, NOW(), NOW());

-- Insérer des sous-tâches (subtasks)
INSERT INTO "subtask" ("name", "description", "task_id", "created_at", "updated_at")
VALUES 
  ('Acheter du lait', 'Prendre du lait demi-écrémé', 1, NOW(), NOW()),
  ('Jouer au frisbee', 'Amener un frisbee à la plage', 2, NOW(), NOW());

-- Insérer des associations entre utilisateurs et tâches (profile_has_task)
-- Insérer des associations entre utilisateurs et tâches (profile_has_task)
INSERT INTO "profile_has_task" ("profile_id", "task_id", "created_at", "updated_at")
VALUES 
  (1, 1, NOW(), NOW()),
  (1, 2, NOW(), NOW()),
  (1, 3, NOW(), NOW()),
  (1, 4, NOW(), NOW()),
  (1, 5, NOW(), NOW()),
  (1, 6, NOW(), NOW()),
  (2, 1, NOW(), NOW()),
  (2, 2, NOW(), NOW()),
  (2, 3, NOW(), NOW()),
  (2, 4, NOW(), NOW()),
  (2, 5, NOW(), NOW()),
  (2, 6, NOW(), NOW()),
  (3, 1, NOW(), NOW()),
  (3, 2, NOW(), NOW()),
  (3, 3, NOW(), NOW()),
  (3, 4, NOW(), NOW()),
  (3, 5, NOW(), NOW()),
  (3, 6, NOW(), NOW()),
  (4, 1, NOW(), NOW()),
  (4, 2, NOW(), NOW()),
  (4, 3, NOW(), NOW()),
  (4, 4, NOW(), NOW()),
  (4, 5, NOW(), NOW()),
  (4, 6, NOW(), NOW()),
  (5, 1, NOW(), NOW()),
  (5, 2, NOW(), NOW()),
  (5, 3, NOW(), NOW()),
  (5, 4, NOW(), NOW()),
  (5, 5, NOW(), NOW()),
  (5, 6, NOW(), NOW());


-- Insérer des associations entre utilisateurs et adresses (account_has_address)
INSERT INTO "account_has_address" ("account_id", "address_id", "created_at", "updated_at")
VALUES 
  (1, 1, NOW(), NOW()),
  (2, 2, NOW(), NOW());

-- Insérer des budgets (budgets)
INSERT INTO "budget" ("amount", "name", "category", "description", "home_id", "created_at", "updated_at")
VALUES 
  (100.00, 'Courses hebdomadaires', 'Courses', 'Budget alloué pour les courses alimentaires de la semaine', 1, NOW(), NOW()),
  (50.00, 'Loisirs mensuels', 'Loisirs', 'Budget pour les activités de loisirs du mois', 1, NOW(), NOW()),
  (25.00, 'Sortie cinéma', 'Loisirs', 'Budget pour les activités de loisirs du mois', 2, NOW(), NOW());