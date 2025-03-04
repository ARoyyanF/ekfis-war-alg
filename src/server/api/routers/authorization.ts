import { z } from "zod";
import { currentUser } from "@clerk/nextjs/server";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { mahasiswas } from "../../db/schema";

export const authorizationRouter = createTRPCRouter({
  currentAuth: publicProcedure.query(({ ctx }) => {
    return ctx.auth;
  }),
  currentUser: protectedProcedure.query(async () => {
    return await currentUser();
  }),

  getMahasiswaData: protectedProcedure.query(async ({ ctx }) => {
    console.log("function: getMahasiswaData");
    console.log("authenticated user: ", ctx.auth);
    const registeredMahasiswa = await db.query.mahasiswas.findFirst({
      where: (model, { eq }) => eq(model.authId, ctx.auth.userId),
    });
    if (!registeredMahasiswa) {
      return null;
    }
    return registeredMahasiswa;
  }),
  bindNimWithUser: protectedProcedure
    .input(z.object({ nim: z.number() }))
    .output(z.object({ message: z.string(), isOk: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      console.log("function: bindNimWithUser");
      console.log("authenticated user: ", ctx.auth);
      const registeredMahasiswa = await db.query.mahasiswas.findFirst({
        where: (model, { eq }) => eq(model.authId, ctx.auth.userId),
      });
      console.log("registeredMahasiswa: ", registeredMahasiswa);

      if (!registeredMahasiswa) {
        // register
        const targetMahasiswa = await db.query.mahasiswas.findFirst({
          where: (model, { eq }) => eq(model.nim, input.nim),
        });
        console.log("targetMahasiswa: ", targetMahasiswa);
        if (targetMahasiswa?.authId === null) {
          await db
            .update(mahasiswas)
            .set({
              authId: ctx.auth.userId,
            })
            .where(eq(mahasiswas.nim, input.nim));
          return {
            message: "NIM successfully assigned with this account",
            isOk: true,
          };
        } else if (targetMahasiswa === undefined) {
          return {
            message: "Mahasiswa with this nim doesn't exist",
            isOk: false,
          };
        } else {
          return {
            message:
              "This NIM is already assigned with another account, please use that account",
            isOk: false,
          };
        }
      }

      //if registeredMahsiswa not null, then user is registered
      if (registeredMahasiswa.nim === input.nim) {
        //check if registered user matches nim
        return {
          message: "This NIM is already assigned with this account",
          isOk: false,
        };
      } else {
        return {
          message: "This NIM is already assigned with a different account",
          isOk: false,
        };
      }
    }),
  unbindNimWithRegisteredUser: protectedProcedure.mutation(async ({ ctx }) => {
    console.log("function: unbindNimWithRegisteredUser");
    const registeredMahasiswa = await db.query.mahasiswas.findFirst({
      where: (model, { eq }) => eq(model.authId, ctx.auth.userId),
    });
    console.log("registeredMahasiswa: ", registeredMahasiswa);
    if (registeredMahasiswa) {
      await db
        .update(mahasiswas)
        .set({
          authId: null,
        })
        .where(eq(mahasiswas.authId, ctx.auth.userId));
      return console.log("NIM successfully unbinded with this user");
    } else {
      return console.log(
        "no NIM was registered with this user in the first place",
      );
    }
  }),
  unbindNimWithUser: protectedProcedure
    .input(z.object({ nim: z.number() }))
    .mutation(async ({ input }) => {
      console.log("function: unbindNimWithUser");
      await db
        .update(mahasiswas)
        .set({
          authId: null,
        })
        .where(eq(mahasiswas.nim, input.nim));
      return console.log("NIM successfully unbinded");
    }),
});
