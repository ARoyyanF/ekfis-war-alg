"use client";

import { api, HydrateClient } from "~/trpc/server";
import { auth } from "@clerk/nextjs/server";

import TestAuth from "./_components/test-auth";
import { SignedIn } from "@clerk/nextjs";
import { NimForm } from "./_components/nimForm";
import { Button } from "~/components/ui/button";
import EventForm from "./_components/EventForm";
import { useRouter } from "next/navigation";

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

import { useState, useEffect, useMemo } from "react";
import CalendarGrid from "./_components/CalendarGrid";
import UserInput from "./_components/UserInput";
import Results from "./_components/Results";

import AvailabilityTypeSelector from "./_components/AvailabilityTypeSelector";
import { UploadButton } from "~/utils/uploadthing";
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
  const router = useRouter();
  const [availability, setAvailability] = useState<{
    [key: string]: { [type: string]: number };
  }>({});
  const [username, setUsername] = useState<string>("");
  const [selectedType, setSelectedType] =
    useState<string>("leastCompromisable");

  useEffect(() => {
    const storedAvailability = localStorage.getItem("availability");
    if (storedAvailability) {
      setAvailability(JSON.parse(storedAvailability));
    }
  }, []);

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
      localStorage.setItem("availability", JSON.stringify(newAvailability));
      return newAvailability;
    });
  };

  const availabilityQuantified = useMemo(() => {
    const numMediumPriority = Object.values(availability)
      .flat()
      .filter((cellAvailability) => cellAvailability.mediumPriority).length;
    const mediumPriorityWeight = Math.min(1, 1 - numMediumPriority / 10);
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
    <main className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">When2Meet Clone</h1>
      <UserInput username={username} setUsername={setUsername} />
      <p>{username}</p>
      <AvailabilityTypeSelector
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />
      <Legend />

      <CalendarGrid
        days={DAYS}
        times={TIMES}
        initialUserAvailability={{}}
        onAvailabilityChange={handleAvailabilityChange}
        selectedType={selectedType}
      />
      <UploadButton
        endpoint="buktiUploader"
        onClientUploadComplete={() => router.refresh()}
      />
      <Button
        onClick={() => {
          localStorage.setItem("availability", "");
          setAvailability({});
          router.refresh();
        }}
      >
        Reset
      </Button>

      <pre>{JSON.stringify(availability, null, 2)}</pre>
      <Results
        days={DAYS}
        times={TIMES}
        availability={availabilityQuantified}
      />
      <EventForm username={username} availability={availability} />
    </main>
  );
}
