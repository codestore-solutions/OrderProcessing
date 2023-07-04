/*
  Warnings:

  - Added the required column `shippingAddressId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `shippingAddressId` INTEGER NOT NULL;
