-- CreateTable
CREATE TABLE "Scannable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "scannable_id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "action" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Scannable_scannable_id_key" ON "Scannable"("scannable_id");
