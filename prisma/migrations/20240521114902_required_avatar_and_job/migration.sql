/*
  Warnings:

  - Made the column `avatar` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `job` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "avatar" SET NOT NULL,
ALTER COLUMN "job" SET NOT NULL;
