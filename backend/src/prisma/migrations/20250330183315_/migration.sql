/*
  Warnings:

  - Added the required column `employementType` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "employementType" TEXT NOT NULL;
