-- AlterTable
ALTER TABLE `program` MODIFY `status` ENUM('Active', 'Inactive', 'Pending') NOT NULL DEFAULT 'Active';
