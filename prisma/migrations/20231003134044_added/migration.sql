/*
  Warnings:

  - The values [user] on the enum `exercise_origin` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `exercise` MODIFY `origin` ENUM('User', 'System') NOT NULL;

-- AddForeignKey
ALTER TABLE `workout` ADD CONSTRAINT `workout_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `program`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
