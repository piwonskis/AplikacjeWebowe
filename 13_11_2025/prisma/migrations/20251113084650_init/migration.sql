-- CreateTable
CREATE TABLE `Wpis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_kategorii` INTEGER NOT NULL,
    `tytul` VARCHAR(191) NOT NULL,
    `tworca` VARCHAR(40) NOT NULL,
    `zawartosc` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kategoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nazwa` VARCHAR(191) NOT NULL,
    `opis_kategorii` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Komentarz` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_wpisu` INTEGER NOT NULL,
    `uzytkownik` VARCHAR(40) NOT NULL,
    `tekst` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Wpis` ADD CONSTRAINT `Wpis_id_kategorii_fkey` FOREIGN KEY (`id_kategorii`) REFERENCES `Kategoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Komentarz` ADD CONSTRAINT `Komentarz_id_wpisu_fkey` FOREIGN KEY (`id_wpisu`) REFERENCES `Wpis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
