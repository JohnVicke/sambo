/*
  Warnings:

  - You are about to drop the column `household_id` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `member_id` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Expense_household_id_key` ON `Expense`;

-- DropIndex
DROP INDEX `Expense_user_id_household_id_idx` ON `Expense`;

-- DropIndex
DROP INDEX `Expense_user_id_key` ON `Expense`;

-- AlterTable
ALTER TABLE `Expense` DROP COLUMN `household_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `member_id` VARCHAR(191) NOT NULL;
