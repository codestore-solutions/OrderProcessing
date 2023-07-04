/*
  Warnings:

  - You are about to drop the column `orderId` on the `order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order_status_timeline` DROP FOREIGN KEY `order_status_timeline_orderId_fkey`;

-- DropIndex
DROP INDEX `Order_orderId_key` ON `order`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `orderId`,
    ADD COLUMN `id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Order_id_key` ON `Order`(`id`);

-- AddForeignKey
ALTER TABLE `order_status_timeline` ADD CONSTRAINT `order_status_timeline_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
