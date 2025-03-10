import React from "react";
import { api } from "~/trpc/react";

interface ResultsProps {
  days: string[];
  times: string[];
  // availabilityQuantified: { [key: string]: number };
}

export default function Results({
  days,
  times,
  // availabilityQuantified,
}: ResultsProps) {
  const { data: availabilityQuantified = {} } =
    api.backend.getGroupAvailabilityQuantified.useQuery();

  const maxAvailability = Math.max(...Object.values(availabilityQuantified));

  return (
    <div className="mt-8 border rounded-md p-6 bg-white shadow-sm">
      <h2 className=" text-2xl font-bold">Bobot kesibukan</h2>
      <p className="font-semibold pb-4">
        Semakin besar bobot, semakin kecil kemungkinan kelompok kalian
        mendapatkan jadwal tersebut
      </p>
      {/* <p>{JSON.stringify(availabilityQuantified, null, 2)}</p> */}
      <div className="grid grid-cols-[auto,repeat(5,1fr)] gap-1">
        <div className="font-bold">Time</div>
        {days.map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
        {times.map((time) => (
          <React.Fragment key={time}>
            <div className="font-bold">{time}</div>
            {days.map((day) => {
              const count = availabilityQuantified[`${day}-${time}`] || 0;
              const intensity = count / maxAvailability;
              return (
                <div
                  key={`${day}-${time}`}
                  className="border p-2"
                  style={{ backgroundColor: `rgba(128, 0, 0, ${intensity})` }}
                >
                  {count > 0 && count}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
