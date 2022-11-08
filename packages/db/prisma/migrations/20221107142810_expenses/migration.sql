-- CreateIndex
CREATE INDEX `Expense_user_id_household_id_idx` ON `Expense`(`user_id`, `household_id`);
