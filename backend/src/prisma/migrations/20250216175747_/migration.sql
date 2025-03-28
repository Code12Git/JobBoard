-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('google', 'github', 'manual');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" "AuthProvider" NOT NULL DEFAULT 'manual',
ALTER COLUMN "password" DROP NOT NULL;
