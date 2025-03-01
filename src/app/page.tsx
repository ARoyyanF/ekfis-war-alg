"use client"

import { api, HydrateClient } from "~/trpc/server";

import { Gallery } from "./_components/gallery";

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

import { useState, useEffect } from "react"
import CalendarGrid from "./_components/CalendarGrid"
import UserInput from "./_components/UserInput"
import Results from "./_components/Results"

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"]
const TIMES = [
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
]

export default function Home() {
  const [availability, setAvailability] = useState<{ [key: string]: number }>({})
  const [username, setUsername] = useState<string>("")

  useEffect(() => {
    const storedAvailability = localStorage.getItem("availability")
    if (storedAvailability) {
      setAvailability(JSON.parse(storedAvailability))
    }
  }, [])

  const handleAvailabilityChange = (day: string, time: string, isAvailable: boolean) => {
    const key = `${day}-${time}`
    setAvailability((prev) => {
      const newAvailability = {
        ...prev,
        [key]: (prev[key] ?? 0) + (isAvailable ? 1 : -1),
      }
      localStorage.setItem("availability", JSON.stringify(newAvailability))
      return newAvailability
    })
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">When2Meet Clone</h1>
      <UserInput username={username} setUsername={setUsername} />
      <CalendarGrid
        days={DAYS}
        times={TIMES}
        availability={availability}
        onAvailabilityChange={handleAvailabilityChange}
      />
      <Results days={DAYS} times={TIMES} availability={availability} />
    </main>
  )
}


