/*
  Warnings:

  - Added the required column `grand_total` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "grand_total" DECIMAL(65,30) NOT NULL;
