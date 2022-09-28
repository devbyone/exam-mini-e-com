-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PROCESSING', 'PAID', 'CANCELLED', 'PAYMENT_FAILED', 'COMPLETED');

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "order_number" TEXT NOT NULL,
    "items" JSONB NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TEXT,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);
