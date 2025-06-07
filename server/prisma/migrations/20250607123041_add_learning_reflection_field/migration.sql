/*
  Warnings:

  - Added the required column `learningReflection` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Review` ADD COLUMN `learningReflection` VARCHAR(191) NOT NULL;
