import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { mahasiswas } from "../../db/schema";

export const seedRouter = createTRPCRouter({
  mahasiswa: protectedProcedure.mutation(async ({ ctx }) => {
    console.log("function: seeding mahasiswa");
    const mahasiswaData = [
      [10222065, "Ahmad Royyan Fatah"],
      [10222080, "Azwa Aliyah Zaki"],
      [1, "test1"],
      [2, "test2"],
      [3, "test3"],
    ];

    const mahasiswaObj = mahasiswaData.map(([nim, name]) => ({
      nim,
      name,
    })) as {
      nim: number;
      name: string;
    }[];

    await db.insert(mahasiswas).values(mahasiswaObj).onConflictDoNothing();
  }),
});
