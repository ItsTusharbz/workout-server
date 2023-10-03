/*
  Warnings:

  - Added the required column `exerciseId` to the `workoutExerciseRelation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `workoutExerciseRelation` ADD COLUMN `exerciseId` INTEGER NOT NULL;
