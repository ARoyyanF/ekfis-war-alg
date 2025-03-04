import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { images } from "~/server/db/schema";
import { db } from "~/server/db";
import { and, eq } from "drizzle-orm";
import { utapi } from "~/server/uploadthing";

export const imageRouter = createTRPCRouter({
  getMyImages: protectedProcedure.query(async ({ ctx }) => {
    const images = await ctx.db.query.images.findMany({
      where: (model, { eq }) => eq(model.userId, ctx.session.user.id),
      orderBy: (model, { asc }) => asc(model.id),
    });
    return images;
  }),
  deleteMyImage: protectedProcedure
    .input(z.object({ imageId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const criteria = and(
        eq(images.id, input.imageId),
        eq(images.userId, ctx.session.user.id),
      );
      const imageKey = await db
        .select({ key: images.key })
        .from(images)
        .where(criteria);
      await db.delete(images).where(criteria);

      await utapi.deleteFiles(`${imageKey[0]!.key}`);
    }),
});
