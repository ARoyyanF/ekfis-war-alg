import { api, HydrateClient } from "~/trpc/server";
import { auth } from "@clerk/nextjs/server";

import TestAuth from "./_components/test-auth";
import { SignedIn } from "@clerk/nextjs";
import { NimForm } from "./_components/nimForm";
import { Button } from "~/components/ui/button";

export default async function HomePage() {
  return (
    <div className="grid grid-cols-2 text-black">
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <SignedIn>{/* <Button onClick{()=>}/> */}</SignedIn>
      </div>
      <div className="flex flex-col gap-4 border-l-4 p-4"></div>
    </div>
  );
}
