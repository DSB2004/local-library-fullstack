/*
  Warnings:

  - Made the column `returnDate` on table `Borrow` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Borrow` MODIFY `returnDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Review` ADD COLUMN `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
