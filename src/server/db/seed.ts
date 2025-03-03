// src/server/db/seed.ts
import { db } from "~/server/db";
import { mahasiswas } from "~/server/db/schema";

const mahasiswaData = [
  [10222065, "Ahmad Royyan Fatah"],
  [10222080, "Azwa Aliyah Zaki"],
];
const seedMahasiswas = async () => {
  const mahasiswaObj = mahasiswaData.map(([nim, name]) => ({ nim, name })) as {
    nim: number;
    name: string;
  }[];
  await db.insert(mahasiswas).values(mahasiswaObj);
};

const main = async () => {
  await seedMahasiswas();
};

await main();
