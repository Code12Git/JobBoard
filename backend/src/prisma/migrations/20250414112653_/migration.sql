/*
  Warnings:

  - You are about to drop the column `skill` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "skill",
ADD COLUMN     "skills" TEXT[];
