"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { NimForm } from "~/app/_components/nimForm";

export function TopNav() {
  const { isSignedIn } = useUser();
  const unbindNimWithUser =
    api.authorization.unbindNimWithRegisteredUser.useMutation();
  const mahasiswaData = api.authorization.getMahasiswaData.useQuery(undefined, {
    enabled: isSignedIn === true,
  });

  return (
    <nav className="flex w-full items-center justify-between border-b-4 p-4 text-xl font-semibold">
      <div>TopNav</div>
      <div>EGGFISH WAR ALGORITHM RAAAAH </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          {mahasiswaData.data && (
            <div className="flex flex-row items-center gap-4">
              {/* <span>Logged in as {user?.fullName}</span> */}
              <div className="flex flex-col text-right">
                <p>{mahasiswaData.data.name}</p>
                <p>{mahasiswaData.data.nim}</p>
              </div>
              <Button
                type="button"
                variant="destructive"
                onClick={async () => {
                  const statusToast = toast.loading("Unbinding NIM...");
                  try {
                    await unbindNimWithUser.mutateAsync();
                    toast.success("NIM unbound successfully");
                  } catch (e) {
                    toast.error("Error: " + JSON.stringify(e));
                  } finally {
                    toast.dismiss(statusToast);
                    window.location.reload();
                  }
                }}
              >
                Unbind NIM
              </Button>
            </div>
          )}
          {!mahasiswaData.data && (
            <div>
              <NimForm />
            </div>
          )}

          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
