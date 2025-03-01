import React from "react";

interface ResultsProps {
  days: string[];
  times: string[];
  availability: { [key: string]: number };
}

export default function Results({ days, times, availability }: ResultsProps) {
  const maxAvailability = Math.max(...Object.values(availability));

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Combined Availability</h2>
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
              const count = availability[`${day}-${time}`] || 0;
              const intensity = count / maxAvailability;
              return (
                <div
                  key={`${day}-${time}`}
                  className="border p-2"
                  style={{ backgroundColor: `rgba(0, 128, 0, ${intensity})` }}
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
