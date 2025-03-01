"use client";

import { api, HydrateClient } from "~/trpc/server";
import { auth } from "@clerk/nextjs/server";

import TestAuth from "./_components/test-auth";
import { SignedIn } from "@clerk/nextjs";
import { NimForm } from "./_components/nimForm";
import { Button } from "~/components/ui/button";

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

import { useState, useEffect } from "react";
import CalendarGrid from "./_components/CalendarGrid";
import UserInput from "./_components/UserInput";
import Results from "./_components/Results";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

import AvailabilityTypeSelector from "./_components/AvailabilityTypeSelector";

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
  mediumPriority: { label: "mediumPriority", color: "bg-green-500", resultColor: "rgba(255, 0, 0, " },
};

export default function Home() {
  const router = useRouter();
  const [availability, setAvailability] = useState<{
    [key: string]: { [type: string]: number };
  }>({});
  const [username, setUsername] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("leastCompromisable");

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

  return (
    <main className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">When2Meet Clone</h1>
      <UserInput username={username} setUsername={setUsername} />
      <AvailabilityTypeSelector
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />
      <div className="mt-6 mb-6">
        <h3 className="mb-2 text-lg font-semibold">Legend</h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-red-500"></div>
            <span>Least compromisable</span>
            <span className="text-gray-400 italic">Matkul wajib, kerja</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-blue-500"></div>
            <span>High priority</span>
            <span className="text-gray-400 italic">Matkul pilihan, magang, MBKM </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-green-500"></div>
            <span>Medium priority</span>
            <span className="text-gray-400 italic">Agenda lain yang bisa digeser</span>
          </div>
        </div>
      </div>
      <CalendarGrid
        days={DAYS}
        times={TIMES}
        initialUserAvailability={{}}
        onAvailabilityChange={handleAvailabilityChange}
        selectedType={selectedType}
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
      <Results days={DAYS} times={TIMES} availability={availability} />
    </main>
  );
}
