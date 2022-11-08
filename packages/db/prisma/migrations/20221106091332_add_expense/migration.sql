-- CreateTable
CREATE TABLE `Expense` (
    `id` VARCHAR(191) NOT NULL,
    `complete` BOOLEAN NOT NULL DEFAULT false,
    `description` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `household_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Expense_user_id_key`(`user_id`),
    UNIQUE INDEX `Expense_household_id_key`(`household_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
