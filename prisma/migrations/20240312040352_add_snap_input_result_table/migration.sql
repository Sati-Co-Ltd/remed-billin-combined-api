-- CreateTable
CREATE TABLE "snapshot" (
    "id" TEXT NOT NULL,
    "input" JSONB,
    "output" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "snapshot_pkey" PRIMARY KEY ("id")
);
