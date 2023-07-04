/*
  Warnings:

  - You are about to drop the column `storeId` on the `order` table. All the data in the column will be lost.
  - Added the required column `vendorId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `storeId`,
    ADD COLUMN `vendorId` INTEGER NOT NULL;
