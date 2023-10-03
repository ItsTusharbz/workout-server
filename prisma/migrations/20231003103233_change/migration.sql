/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `contact` INTEGER NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `address` VARCHAR(200) NOT NULL,
    `isAdmin` BOOLEAN NOT NULL,
    `status` ENUM('Active', 'Inactive', 'Pending') NOT NULL,
    `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
