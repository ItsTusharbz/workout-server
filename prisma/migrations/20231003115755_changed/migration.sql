/*
  Warnings:

  - You are about to drop the `workouts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `workouts`;

-- CreateTable
CREATE TABLE `exercise` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `bodyPartId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `origin` ENUM('user', 'System') NOT NULL,
    `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
