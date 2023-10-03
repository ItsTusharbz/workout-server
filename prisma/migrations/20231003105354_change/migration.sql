/*
  Warnings:

  - You are about to alter the column `status` on the `program` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `program` MODIFY `status` ENUM('Active', 'Inactive', 'Pending') NOT NULL;
