/*
  Warnings:

  - You are about to drop the column `bodyPartId` on the `workouts` table. All the data in the column will be lost.
  - Added the required column `programId` to the `workouts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `workouts` DROP COLUMN `bodyPartId`,
    ADD COLUMN `programId` INTEGER NOT NULL;
