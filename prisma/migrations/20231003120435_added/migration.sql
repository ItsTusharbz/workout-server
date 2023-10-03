/*
  Warnings:

  - Added the required column `userId` to the `workout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `workout` ADD COLUMN `userId` INTEGER NOT NULL;
