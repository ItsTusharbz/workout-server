/*
  Warnings:

  - You are about to drop the `programDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `programWorkoutDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workoutDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `programDetail`;

-- DropTable
DROP TABLE `programWorkoutDetail`;

-- DropTable
DROP TABLE `workoutDetails`;

-- CreateTable
CREATE TABLE `workoutExerciseRelation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `workoutId` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL DEFAULT 0,
    `repetition` INTEGER NOT NULL DEFAULT 0,
    `time` INTEGER NOT NULL,
    `isDone` BOOLEAN NOT NULL,
    `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `workoutExerciseRelation` ADD CONSTRAINT `workoutExerciseRelation_workoutId_fkey` FOREIGN KEY (`workoutId`) REFERENCES `workout`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
