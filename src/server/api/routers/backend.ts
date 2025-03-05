import { z } from "zod";
import { currentUser } from "@clerk/nextjs/server";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { db } from "~/server/db";
import { and, eq, isNotNull, not } from "drizzle-orm";
import { groups, mahasiswas } from "../../db/schema";

function concatenateAndSumJSON(
  jsonList: Record<string, number>[],
): Record<string, number> {
  const result: Record<string, number> = {};

  for (const jsonObject of jsonList) {
    for (const key in jsonObject) {
      if (jsonObject.hasOwnProperty(key)) {
        const value = jsonObject[key];
        if (result.hasOwnProperty(key)) {
          result[key] += value;
        } else {
          result[key] = value;
        }
      }
    }
  }

  return result;
}

export const backendRouter = createTRPCRouter({
  submitToDb: protectedProcedure
    .input(
      z.object({
        groupNumber: z.number(),
        highPriorityDescription: z.string(),
        leastCompromisableProof: z.string(),
        availability: z.record(z.record(z.number())),
        availabilityQuantified: z.record(z.number()),
        nim: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const {
        groupNumber,
        highPriorityDescription,
        leastCompromisableProof,
        availability,
        availabilityQuantified,
        nim,
      } = input;

      const mahasiswaPreviousData = await db.query.mahasiswas.findFirst({
        where: and(eq(mahasiswas.nim, nim), isNotNull(mahasiswas.groupNumber)),
      });

      //! Update existing mahasiswa record
      await db
        .update(mahasiswas)
        .set({
          groupNumber,
          availability,
          availabilityQuantified,
          leastCompromisableProof,
          highPriorityDescription,
        })
        .where(eq(mahasiswas.nim, nim));

      //!edge case for when mahasiswa changes group, refresh the previous group to erase the previous mahasiswa
      if (mahasiswaPreviousData) {
        const MahasiswaPreviousGroupNumber = mahasiswaPreviousData.groupNumber!;
        const thisGroupMahasiswas = await db.query.mahasiswas.findMany({
          where: eq(mahasiswas.groupNumber, MahasiswaPreviousGroupNumber),
          columns: { availabilityQuantified: true, nim: true },
        });

        const concatenatedAvailabilitiesPreviousGroup = concatenateAndSumJSON(
          thisGroupMahasiswas.map(
            (mahasiswa) => mahasiswa.availabilityQuantified,
          ),
        );
        const concatenatedMembersNimPreviousGroup = thisGroupMahasiswas.map(
          (mahasiswa) => mahasiswa.nim,
        );
        await db
          .update(groups)
          .set({
            membersNim: concatenatedMembersNimPreviousGroup,
            groupAvailabilityQuantified:
              concatenatedAvailabilitiesPreviousGroup,
          })
          .where(eq(groups.groupNumber, MahasiswaPreviousGroupNumber));
      }

      const thisGroupMahasiswas = await db.query.mahasiswas.findMany({
        where: eq(mahasiswas.groupNumber, groupNumber),
        columns: { availabilityQuantified: true, nim: true },
      });

      const concatenatedAvailabilities = concatenateAndSumJSON(
        thisGroupMahasiswas.map(
          (mahasiswa) => mahasiswa.availabilityQuantified,
        ),
      );
      const concatenatedMembersNim = thisGroupMahasiswas.map(
        (mahasiswa) => mahasiswa.nim,
      );

      // Populate groups table
      const existingGroup = await db.query.groups.findFirst({
        where: eq(groups.groupNumber, groupNumber),
      });

      if (existingGroup) {
        // Update existing group
        await db
          .update(groups)
          .set({
            membersNim: concatenatedMembersNim,
            groupAvailabilityQuantified: concatenatedAvailabilities,
          })
          .where(eq(groups.groupNumber, groupNumber));
      } else {
        // Create new group
        await db.insert(groups).values({
          groupNumber,
          membersNim: concatenatedMembersNim,
          groupAvailabilityQuantified: concatenatedAvailabilities,
        });
      }

      return { message: "Form submitted successfully" };
    }),
  getGroups: protectedProcedure.query(async () => {
    const groups = await db.query.groups.findMany();
    return groups;
  }),

  getGroupAvailabilityQuantified: protectedProcedure.query(async ({ ctx }) => {
    console.log("test1");
    const mahasiswaGroup = (
      await db.query.mahasiswas.findFirst({
        where: (model, { eq }) => eq(model.authId, ctx.auth.userId),
        columns: {
          groupNumber: true,
        },
      })
    )?.groupNumber;
    console.log("test2");
    if (!mahasiswaGroup) {
      console.log(
        "getGroupAvailabilityQuantified: mahasiswa is not in a group",
      );
      return {};
    }
    const group = await db.query.groups.findFirst({
      where: (model, { eq }) => eq(model.groupNumber, mahasiswaGroup),
      columns: {
        groupAvailabilityQuantified: true,
      },
    });
    return group!.groupAvailabilityQuantified;
  }),

  getMahasiswaData: protectedProcedure.query(async ({ ctx }) => {
    const mahasiswa = await db.query.mahasiswas.findFirst({
      where: (model, { eq }) => eq(model.authId, ctx.auth.userId),
    });
    return mahasiswa;
  }),
});
