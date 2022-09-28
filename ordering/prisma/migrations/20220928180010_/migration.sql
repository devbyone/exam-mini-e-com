/*
  Warnings:

  - A unique constraint covering the columns `[id,order_number]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "orders_order_number_key";

-- CreateIndex
CREATE UNIQUE INDEX "orders_id_order_number_key" ON "orders"("id", "order_number");
