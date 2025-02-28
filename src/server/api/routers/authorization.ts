import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const authorizationRouter = createTRPCRouter({
  currentSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
});
