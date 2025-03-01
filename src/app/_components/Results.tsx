import React from "react";
import { AVAILABILITY_TYPES } from "../page";

interface ResultsProps {
  days: string[];
  times: string[];
  availability: { [key: string]: { [type: string]: number } };
}

export default function Results({ days, times, availability }: ResultsProps) {
  // Find the maximum count for each availability type
  const getMaxAvailability = (type: string) => {
    let max = 0;
    Object.values(availability).forEach((cellData) => {
      if (cellData[type] && cellData[type] > max) {
        max = cellData[type];
      }
    });
    return max;
  };

  const maxAvailable = getMaxAvailability("available");
  const maxLeisure = getMaxAvailability("leisure");
  const maxBusy = getMaxAvailability("busy");

  // Get cell background based on availability types
  const getCellBackground = (day: string, time: string) => {
    const key = `${day}-${time}`;
    const cellData = availability[key] || {};

    // Prioritize display: available > leisure > busy
    if (cellData.available && cellData.available > 0) {
      const intensity = cellData.available / maxAvailable;
      return {
        background: `${AVAILABILITY_TYPES.available.resultColor}${intensity})`,
        count: cellData.available,
      };
    }

    if (cellData.leisure && cellData.leisure > 0) {
      const intensity = cellData.leisure / maxLeisure;
      return {
        background: `${AVAILABILITY_TYPES.leisure.resultColor}${intensity})`,
        count: cellData.leisure,
      };
    }

    if (cellData.busy && cellData.busy > 0) {
      const intensity = cellData.busy / maxBusy;
      return {
        background: `${AVAILABILITY_TYPES.busy.resultColor}${intensity})`,
        count: cellData.busy,
      };
    }

    return { background: "transparent", count: 0 };
  };

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
              const { background, count } = getCellBackground(day, time);
              return (
                <div
                  key={`${day}-${time}`}
                  className="border p-2"
                  style={{ backgroundColor: background }}
                >
                  {count > 0 && count}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="mb-2 text-lg font-semibold">Legend</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-green-500"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-blue-500"></div>
            <span>Leisure</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-red-500"></div>
            <span>Busy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
