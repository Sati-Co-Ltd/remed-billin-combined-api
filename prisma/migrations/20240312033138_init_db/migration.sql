-- CreateTable
CREATE TABLE "app" (
    "id" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "limitation" INTEGER NOT NULL DEFAULT 2000,
    "currentUsage" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "app_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "app_apiKey_key" ON "app"("apiKey");
