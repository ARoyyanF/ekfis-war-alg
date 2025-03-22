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
// Import Google Sheets API
import type { sheets_v4 } from "googleapis";
import { google } from "googleapis";

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

  // New procedure to submit data to Google Sheets
  submitDbToSheets: protectedProcedure.mutation(async () => {
    try {
      // 1. Set up Google Sheets API credentials
      const credentials = {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL ?? "",
        private_key: (process.env.GOOGLE_SHEETS_PRIVATE_KEY ?? "").replace(
          /\\n/g,
          "\n",
        ),
      };

      // 2. Create auth client
      let auth;
      try {
        auth = new (google.auth.GoogleAuth as any)({
          credentials,
          scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });
      } catch (authError) {
        console.error("Error creating Google Auth client:", authError);
        throw new Error("Failed to authenticate with Google Sheets API");
      }

      // 3. Create sheets client
      let sheets;
      try {
        sheets = (google as any).sheets({ version: "v4", auth });
      } catch (sheetsError) {
        console.error("Error creating Google Sheets client:", sheetsError);
        throw new Error("Failed to initialize Google Sheets client");
      }

      const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

      if (!spreadsheetId) {
        throw new Error("Google Sheets spreadsheet ID not configured");
      }

      // 4. Get all groups from the database
      const allGroups = await db.query.groups.findMany({
        orderBy: (groups, { asc }) => [asc(groups.groupNumber)],
      });

      // Process each group
      for (const group of allGroups) {
        const {
          groupNumber,
          membersNim,
          groupAvailabilityQuantified,
          updatedAt,
        } = group;

        //get sheet name
        const groupNumberStr =
          typeof groupNumber === "number" ? groupNumber.toString() : "Unknown";
        const sheetName = `Group ${groupNumberStr}`;

        // Create sheet if it doesn't exist
        try {
          await (sheets as any).spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: {
              requests: [
                {
                  addSheet: {
                    properties: {
                      title: sheetName,
                    },
                  },
                },
              ],
            },
          });
        } catch (err) {
          // Sheet might already exist, continue
          console.log(`Sheet ${sheetName} might already exist`);
        }

        //clear the sheet
        try {
          await (sheets as any).spreadsheets.values.clear({
            spreadsheetId,
            range: `${sheetName}!A1:Z1000`, // Clear a large range to ensure all data is removed
          });
        } catch (clearError) {
          console.error(`Error clearing sheet ${sheetName}:`, clearError);
          throw new Error(`Failed to clear sheet ${sheetName}`);
        }

        if (!membersNim || membersNim.length === 0) continue;

        // 5. Get mahasiswa details for each member in the group
        const groupMembers = await db.query.mahasiswas.findMany({
          where: (mahasiswas, { inArray }) =>
            inArray(mahasiswas.nim, membersNim),
          columns: {
            nim: true,
            name: true,
            highPriorityDescription: true,
            leastCompromisableProof: true,
          },
        });

        // 7. Prepare header row with days as columns
        const headerRow = [
          "Time", // Column for time slots
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
        ];

        // 8. Parse availabilityKeys to extract days and times
        const times = [
          "07:00",
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
        ];
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

        // 9. Create time-based rows for availability data
        const availabilityTimeRows: string[][] = [];

        if (groupAvailabilityQuantified) {
          // Create a row for each time slot
          times.forEach((time) => {
            const timeRow: string[] = [
              time, // Time in first column
            ];

            // Add values for each day
            days.forEach((day) => {
              const key = `${day}-${time}`;
              const value = (
                groupAvailabilityQuantified as Record<string, number>
              )[key];
              timeRow.push(value !== undefined ? value.toString() : "0");
            });

            availabilityTimeRows.push(timeRow);
          });
        }

        // 10. Add member information after the availability grid
        const memberInfoStartRow = availabilityTimeRows.length + 3; // +3 for header, empty row, and title
        const memberInfoHeader = ["Member Information", "", "", "", "", "", ""];

        const memberInfoRows = groupMembers.map((member) => [
          `NIM: ${member.nim}`,
          `Name: ${member.name || ""}`,
          `High Priority: ${member.highPriorityDescription || ""}`,
          `Proof: ${member.leastCompromisableProof || ""}`,
          "",
          "",
          "",
        ]);

        // 11. Add last updated timestamp
        const updatedAtRow = [
          "Last Updated:",
          updatedAt ? updatedAt.toISOString() : "",
          "",
          "",
          "",
          "",
          "",
        ];

        // 12. Combine all rows
        const allRows = [
          headerRow,
          ...availabilityTimeRows,
          [""], // Empty row as separator
          memberInfoHeader,
          ...memberInfoRows,
          [""], // Empty row as separator
          updatedAtRow,
        ];

        // 13. Update the sheet
        try {
          await (sheets as any).spreadsheets.values.update({
            spreadsheetId,
            range: `${sheetName}!A1`,
            valueInputOption: "RAW",
            requestBody: {
              values: allRows,
            },
          });
        } catch (updateError) {
          console.error(`Error updating sheet ${sheetName}:`, updateError);
          throw new Error(`Failed to update sheet ${sheetName}`);
        }
      }

      return {
        success: true,
        message: `Successfully exported ${allGroups.length} groups to Google Sheets`,
      };
    } catch (error) {
      console.error("Error exporting to Google Sheets:", error);
      throw new Error(
        `Failed to export to Google Sheets: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }),
});
