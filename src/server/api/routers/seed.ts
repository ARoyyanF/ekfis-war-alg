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
      [4, "test4"],
      [5, "test5"],
      [6, "test6"],
      [7, "test7"],
      [8, "test8"],
      [9, "test9"],
      [10, "test10"],
      [11, "test11"],
      [12, "test12"],
      [13, "test13"],
      [14, "test14"],
      [15, "test15"],
      [16, "test16"],
      [17, "test17"],
      [18, "test18"],
      [19, "test19"],
      [20, "test20"],
      [21, "test21"],
      [22, "test22"],
      [23, "test23"],
      [24, "test24"],
      [25, "test25"],
      [26, "test26"],
      [27, "test27"],
      [28, "test28"],
      [29, "test29"],
      [30, "test30"],
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
