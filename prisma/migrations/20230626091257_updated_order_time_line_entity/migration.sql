/*
  Warnings:

  - You are about to drop the `order_status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `order_status`;

-- CreateTable
CREATE TABLE `order_status_timeline` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderStatusId` INTEGER NOT NULL,
    `orderId` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `order_status_timeline_order_id_index`(`orderId`),
    INDEX `order_status_timeline_event_type_index`(`orderStatusId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order_status_timeline` ADD CONSTRAINT `order_status_timeline_orderStatusId_fkey` FOREIGN KEY (`orderStatusId`) REFERENCES `OrderStatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_status_timeline` ADD CONSTRAINT `order_status_timeline_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
