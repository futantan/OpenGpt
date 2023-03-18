-- CreateTable
CREATE TABLE `OpenGptApp` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `hint` VARCHAR(191) NULL,
    `demoInput` VARCHAR(1000) NOT NULL,
    `prompt` VARCHAR(10000) NOT NULL,
    `usedCount` BIGINT NOT NULL DEFAULT 1,
    `shouldHide` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `OpenGptApp_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
