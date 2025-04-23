import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

import { Toaster } from "~/components/ui/sonner";
import { TopNav } from "~/components/topnav";
import { api, HydrateClient } from "~/trpc/server";
import Footer from "./_components/Footer";

export const metadata: Metadata = {
  title: "Ekfis war algorithm",
  description: "inspired by painful ekfis",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <body className="min-h-screen flex flex-col">
          <TRPCReactProvider>
            <HydrateClient>
              <TopNav />
              <main className="flex-grow">{children}</main>
              <Footer />
              <Toaster richColors />
            </HydrateClient>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
