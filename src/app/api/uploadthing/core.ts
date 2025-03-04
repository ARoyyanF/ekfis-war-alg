/* eslint-disable @typescript-eslint/only-throw-error */
import { auth } from "@clerk/nextjs/server";
// import { auth } from "~/server/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { buktis } from "~/server/db/schema";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  // imageUploader: f({
  //   image: {
  //     /**
  //      * For full list of options and defaults, see the File Route API reference
  //      * @see https://docs.uploadthing.com/file-routes#route-config
  //      */
  //     maxFileSize: "16MB",
  //     maxFileCount: 100,
  //   },
  // })
  //   // Set permissions and file types for this FileRoute
  //   .middleware(async ({ req }) => {
  //     // This code runs on your server before upload
  //     const user = await auth();

  //     // If you throw, the user will not be able to upload
  //     if (!user) throw new UploadThingError("Unauthorized");

  //     // Whatever is returned here is accessible in onUploadComplete as `metadata`
  //     return { userId: user.userId };
  //   })
  //   .onUploadComplete(async ({ metadata, file }) => {
  //     // This code RUNS ON YOUR SERVER after upload
  //     console.log("Upload complete for userId:", metadata.userId);

  //     console.log("file url", file.ufsUrl);

  //     await db.insert(images).values({
  //       name: file.name,
  //       url: file.ufsUrl,
  //       key: file.key,
  //       userId: metadata.userId,
  //     });

  //     // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
  //     return { uploadedBy: metadata.userId };
  //   }),
  buktiUploader: f({
    blob: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "16MB",
      maxFileCount: 10,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth();

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.ufsUrl);

      await db.insert(buktis).values({
        name: file.name,
        url: file.ufsUrl,
        key: file.key,
        userId: metadata.userId!,
      });

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
