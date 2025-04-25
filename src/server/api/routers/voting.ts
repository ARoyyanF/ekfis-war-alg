import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";
import { eq, sql, count } from "drizzle-orm";
import { mahasiswas } from "../../db/schema";

export const votingRouter = createTRPCRouter({
  recordVote: protectedProcedure
    .input(z.object({ scheduleId: z.number().nullable() }))
    .mutation(async ({ ctx, input }) => {
      console.log("function: recordVote");
      console.log("authenticated user: ", ctx.auth);
      await db
        .update(mahasiswas)
        .set({
          votedScheduleId: input.scheduleId,
          updatedAt: new Date(),
        })
        .where(eq(mahasiswas.authId, ctx.auth.userId));
      return { success: true };
    }),

  getVoteCounts: publicProcedure.query(async () => {
    console.log("function: getVoteCounts");
    const results = await db
      .select({
        scheduleId: mahasiswas.votedScheduleId,
        count: count(mahasiswas.nim),
      })
      .from(mahasiswas)
      .where(sql`${mahasiswas.votedScheduleId} is not null`)
      .groupBy(mahasiswas.votedScheduleId);

    const voteCounts: Record<number, number> = {};
    results.forEach((row) => {
      if (row.scheduleId !== null) {
        voteCounts[row.scheduleId] = row.count;
      }
    });

    return voteCounts;
  }),
});
