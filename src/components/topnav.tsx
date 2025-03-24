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
import Image from "next/image";

export function TopNav() {
  const trpcClient = api.useContext();
  const { isSignedIn } = useUser();
  const unbindNimWithUser =
    api.authorization.unbindNimWithRegisteredUser.useMutation();
  const mahasiswaData = api.authorization.getMahasiswaData.useQuery(undefined, {
    enabled: isSignedIn === true,
  });

  // Use different height when logged in with NIM to provide more space
  const navHeight = mahasiswaData.data ? { height: "auto", minHeight: "120px" } : { height: "auto", maxHeight: "120px" };

  return (
    <div className="relative w-full border-b-4 bg-[#f3f3f3]" style={navHeight}>
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image 
          src="/images/topnav4.png" 
          alt="Background" 
          fill={true}
          style={{ objectFit: 'contain' }}
          priority
          sizes="100vw"
        />
      </div>
      <nav className="relative flex w-full h-full items-center justify-between px-6 py-3 text-xl font-semibold z-10">
        <div className="flex-1">
          {/* Logo area */}
        </div>
        <div className="flex flex-row items-center justify-end gap-6">
          <SignedOut>
            <div className="flex flex-col items-start">
              <span className="text-sm font-normal mb-1 text-gray-700">NIM</span>
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            {mahasiswaData.data && (
              <div className="flex flex-row items-center gap-5">
                <div className="flex flex-col text-right">
                  <p className="text-gray-800 mb-1 text-lg font-medium">{mahasiswaData.data.name}</p>
                  <p className="text-gray-700 text-base font-medium">{mahasiswaData.data.nim}</p>
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={async () => {
                    const statusToast = toast.loading("Unbinding NIM...");
                    try {
                      await unbindNimWithUser.mutateAsync();
                      toast.success("NIM unbound successfully");
                    } catch (e) {
                      toast.error("Error: " + JSON.stringify(e));
                    } finally {
                      toast.dismiss(statusToast);
                      await trpcClient.invalidate();
                    }
                  }}
                >
                  Unbind NIM
                </Button>
              </div>
            )}
            {!mahasiswaData.data && (
              <div className="flex items-center">
                <NimForm />
              </div>
            )}
            <div className="flex items-center self-center">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </nav>
    </div>
  );
}