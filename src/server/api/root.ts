// import { postRouter } from "~/server/api/routers/post-old";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { imageRouter } from "./routers/image";
import { authorizationRouter } from "./routers/authorization";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  authorization: authorizationRouter,
  image: imageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
