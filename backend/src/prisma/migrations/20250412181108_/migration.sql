/*
  Warnings:

  - Added the required column `message` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "message" TEXT NOT NULL;
