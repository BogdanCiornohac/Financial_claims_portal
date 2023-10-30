-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `declined` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `inProgress` BOOLEAN NOT NULL DEFAULT true;
