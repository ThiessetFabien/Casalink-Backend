-- Deploy casalink:init_bdd to pg

BEGIN;

DROP TABLE IF EXISTS "budget", "subtask", "task", "category", "address", "profile", "account", "home" CASCADE;

CREATE TABLE IF NOT EXISTS "home" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "shopping_list" TEXT[],
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "account" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "role" TEXT CHECK("role" IN ('user', 'admin')) DEFAULT 'user' NOT NULL,
    "password" TEXT NOT NULL,
    "home_id" INT REFERENCES "home"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "profile" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'Profile 1',
    "birthdate" TIMESTAMPTZ NOT NULL,
    "role" TEXT CHECK("role" IN ('adult', 'child')) DEFAULT 'adult' NOT NULL,
    "pin" TEXT CHECK (pin ~ '^[0-9]{4}$'),
    "score" INT DEFAULT 0 NOT NULL,
    "image" TEXT DEFAULT 'assets/avatars/default-avatar.webp',
    "email" TEXT,
    "account_id" INT REFERENCES "account"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "address" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "additional_information" TEXT,
    "postal_code" TEXT CHECK (postal_code ~ '(^0[1-9]\d{3}$)|(^9[0-6]\d{3}$)|(^[1-8]\d{4}$)|(^9[78][12478]\d{2}$)') NOT NULL,
    "country" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "category" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "color" TEXT,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "task" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "start_date" TIMESTAMPTZ NOT NULL,
  "end_date" TIMESTAMPTZ CONSTRAINT "check_duration" CHECK ("end_date" > "start_date") NOT NULL,
  "reward_point" INT,
  "priority" TEXT,
  "status" TEXT DEFAULT('A Débuter') NOT NULL,
  "description" TEXT,
  "category_id" INT REFERENCES "category"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "subtask" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "description" TEXT,
  "name" TEXT NOT NULL,
  "task_id" INT REFERENCES "task"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "profile_has_task" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "profile_id" INT REFERENCES "profile"("id") ON DELETE CASCADE,
  "task_id" INT REFERENCES "task"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "account_has_address" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "account_id" INT REFERENCES "account"("id") ON DELETE CASCADE,
  "address_id" INT REFERENCES "address"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "budget" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "amount" NUMERIC(10,2) DEFAULT 0 NOT NULL,
  "name" TEXT NOT NULL,
  "category" TEXT,
  "description" TEXT,
  "home_id" INT REFERENCES "home"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

COMMIT;