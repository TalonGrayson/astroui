
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getScannables = async () => {
    return await prisma.scannable.findMany();
}

const createScannable = async (scannable_id: string, category: string, name: string, action: string) => {
  const scannable = await prisma.scannable.create({
    data: {
      scannable_id: scannable_id as string,
      category: category as string,
      name: name as string,
      action: action as string,
    },
  });

  return scannable;
}

const getScannable = async (scannable_id: string) => {
  return await prisma.scannable.findUnique({
    where: {
      scannable_id: scannable_id,
    },
  });
}

export {
    getScannables,
    getScannable,
    createScannable
};