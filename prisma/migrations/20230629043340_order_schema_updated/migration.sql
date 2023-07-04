/*
  Warnings:

  - The primary key for the `order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order_status_timeline` DROP FOREIGN KEY `order_status_timeline_orderId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `orderId` INTEGER NOT NULL,
    MODIFY `orderStatusId` INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX `Order_orderId_key` ON `Order`(`orderId`);

-- AddForeignKey
ALTER TABLE `order_status_timeline` ADD CONSTRAINT `order_status_timeline_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;
