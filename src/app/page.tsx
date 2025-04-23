"use client";

// import { api, HydrateClient } from "~/trpc/server";
import { auth } from "@clerk/nextjs/server";

import TestAuth from "./_components/test-auth";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { NimForm } from "./_components/nimForm";
import { Button } from "~/components/ui/button";
import AvailabilityForm from "./_components/AvailabilityForm";
import { useRouter } from "next/navigation";
import { LandingPage } from "./_components/LandingPage";
import { Timeline } from "./_components/Timeline";

// export default async function HomePage() {
//   const session = await api.authorization.currentSession();
//   return (
//     <HydrateClient>
//       <main className="grid grid-cols-2 text-black">
//         <div>{session && <Gallery />}</div>
//         <div className="flex flex-col gap-4 border-l-4 p-4">
//           <iframe
//             width="100%"
//             height="315"
//             src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
//             title="Rick Astley - Never Gonna Give You Up"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           />
//           <pre>{JSON.stringify(session, null, 2)}</pre>
//         </div>
//       </main>
//     </HydrateClient>
//   );
// }

import { api } from "~/trpc/react";

import { useState, useEffect, useMemo } from "react";
import CalendarGrid from "./_components/CalendarGrid";
// import UserInput from "./_components/UserInput";
import Results from "./_components/Results";

import AvailabilityTypeSelector from "./_components/AvailabilityTypeSelector";
// import { UploadButton } from "~/utils/uploadthing";
import Legend from "./_components/Legend";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const TIMES: string[] = [];
for (let hour = 7; hour <= 16; hour++) {
  TIMES.push(`${hour}:00`);
}
export const AVAILABILITY_TYPES = {
  leastCompromisable: {
    label: "leastCompromisable",
    color: "bg-red-500",
    resultColor: "rgba(0, 128, 0, ",
  },
  highPriority: {
    label: "highPriority",
    color: "bg-blue-500",
    resultColor: "rgba(0, 0, 255, ",
  },
  mediumPriority: {
    label: "mediumPriority",
    color: "bg-green-500",
    resultColor: "rgba(255, 0, 0, ",
  },
};

export default function Home() {
  const { isSignedIn } = useUser();
  const mahasiswaData = api.authorization.getMahasiswaData.useQuery(undefined, {
    enabled: isSignedIn === true,
  });
  const seedMahasiswa = api.seed.mahasiswa.useMutation();

  const router = useRouter();
  const [availability, setAvailability] = useState<{
    [key: string]: { [type: string]: number };
  }>({});
  const [username, setUsername] = useState<string>("");
  const [selectedType, setSelectedType] =
    useState<string>("leastCompromisable");

  // useEffect(() => {
  //   const storedAvailability = localStorage.getItem("availability");
  //   if (storedAvailability) {
  //     setAvailability(JSON.parse(storedAvailability));
  //   }
  // }, []);
  useEffect(() => {
    if (mahasiswaData.data) {
      const availability = mahasiswaData.data.availability;
      setAvailability(
        availability as { [key: string]: { [type: string]: number } },
      );
    }
  }, [mahasiswaData.data]);

  const handleAvailabilityChange = (
    day: string,
    time: string,
    isAvailable: boolean,
  ) => {
    const key = `${day}-${time}`;
    setAvailability((prev) => {
      // Initialize if not exists
      const prevCellData = prev[key] || {};

      // Update the count for the selected type
      const newCellData = {
        ...prevCellData,
        //[selectedType]: (prevCellData[selectedType] || 0) + (isAvailable ? 1 : -1),
        [selectedType]: isAvailable
          ? (prevCellData[selectedType] ?? 0) + 1
          : Math.max(0, (prevCellData[selectedType] ?? 0) - 1),
      };

      const newAvailability = {
        ...prev,
        [key]: newCellData,
      };
      // localStorage.setItem("availability", JSON.stringify(newAvailability));
      return newAvailability;
    });
  };

  const availabilityQuantified = useMemo(() => {
    const numMediumPriority = Object.values(availability)
      .flat()
      .filter((cellAvailability) => cellAvailability.mediumPriority).length;
    const mediumPriorityWeight = Math.max(0, 2 - numMediumPriority / 10);
    return Object.fromEntries(
      Object.entries(availability).map(([key, cellAvailability]) => {
        const weighted = Object.entries(cellAvailability).reduce(
          (acc, [type, count]) => {
            switch (type) {
              case "leastCompromisable":
                return acc + count * 3;
              case "highPriority":
                return acc + count * 2;
              case "mediumPriority":
                return acc + count * mediumPriorityWeight;
              default:
                return acc;
            }
          },
          0,
        );
        return [key, weighted];
      }),
    );
  }, [availability]);

  return (
    <>
      {/* Landing Page Section - Always shown first */}
      <div className="container mx-auto p-4">
        <LandingPage />
      </div>

      {/* Timeline Section - Always shown after Landing Page */}
      <div className="container mx-auto p-4">
        <Timeline />
      </div>

      {/* Availability Section - Only for signed-in users */}
      <div className="container mx-auto p-4">
        <SignedIn>
          {mahasiswaData.data && (
            <div>
              <div className="mt-8 border rounded-md p-6 bg-white shadow-sm">
                <h1 className="mb-4 text-3xl font-bold">Pendataan Kesibukan</h1>

                <AvailabilityTypeSelector
                  selectedType={selectedType}
                  onTypeChange={setSelectedType}
                />
                <Legend />

                <CalendarGrid
                  days={DAYS}
                  times={TIMES}
                  initialUserAvailability={availability}
                  onAvailabilityChange={handleAvailabilityChange}
                  selectedType={selectedType}
                />
              </div>

              <AvailabilityForm
                groupNum={undefined}
                nim={mahasiswaData.data.nim}
                availability={availability}
                availabilityQuantified={availabilityQuantified}
              />
              <Results
                days={DAYS}
                times={TIMES}
                // availabilityQuantified={availabilityQuantified}
              />
              {/* <Button,
              onClick={() => {
                // localStorage.setItem("availability", "");
                setAvailability({});
                router.refresh();
              }}
            >
              Reset
            </Button,> */}
            </div>
          )}
        </SignedIn>

        <SignedOut>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">
              Please sign in to use the Ekfis War Algorithm
            </h2>
            <p className="mb-4">Sign in with your account to use the system.</p>
          </div>
        </SignedOut>
      </div>
    </>
  );
}
