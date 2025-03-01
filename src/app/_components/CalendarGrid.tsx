"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { AVAILABILITY_TYPES } from "../page";

interface CalendarGridProps {
  days: string[];
  times: string[];
  availability: { [key: string]: { [type: string]: number } };
  onAvailabilityChange: (
    day: string,
    time: string,
    isAvailable: boolean,
  ) => void;
  selectedType: string;
}

export default function CalendarGrid({
  days,
  times,
  availability,
  onAvailabilityChange,
  selectedType,
}: CalendarGridProps) {
  const [userAvailability, setUserAvailability] = useState<{
    [key: string]: { [type: string]: boolean };
  }>({});
  const [isDragging, setIsDragging] = useState(false);
  const [isSelecting, setIsSelecting] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleCellInteraction = useCallback(
    (day: string, time: string) => {
      const key = `${day}-${time}`;
      const cellAvailability = userAvailability[key] || {};
      const currentTypeAvailability = cellAvailability[selectedType] || false;
      const otherTypeAvailability = Object.keys(AVAILABILITY_TYPES)
        .filter((type) => type !== selectedType)
        .some((type) => cellAvailability[type]);

      const newAvailability = isSelecting && !otherTypeAvailability;
      // const newAvailability = isSelecting;

      if (currentTypeAvailability !== newAvailability) {
        setUserAvailability((prev) => ({
          ...prev,
          [key]: {
            ...prev[key],
            [selectedType]: newAvailability,
          },
        }));
        onAvailabilityChange(day, time, newAvailability);
      }
    },
    [isSelecting, onAvailabilityChange, userAvailability, selectedType],
  );

  const getCellFromPoint = useCallback((x: number, y: number) => {
    if (!gridRef.current) return null;
    const gridRect = gridRef.current.getBoundingClientRect();
    const cells = gridRef.current.querySelectorAll(".cell");
    for (const cell of cells) {
      const rect = cell.getBoundingClientRect();
      if (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      ) {
        const [day, time] = (cell as HTMLElement).dataset.key?.split("-") || [];
        return { day, time };
      }
    }
    return null;
  }, []);

  const handleStart = useCallback(
    (day: string, time: string) => {
      setIsDragging(true);
      const key = `${day}-${time}`;
      const cellAvailability = userAvailability[key] || {};
      setIsSelecting(!cellAvailability[selectedType]);
      handleCellInteraction(day, time);
    },
    [handleCellInteraction, userAvailability, selectedType],
  );

  const handleMove = useCallback(
    (x: number, y: number) => {
      if (isDragging) {
        const cell = getCellFromPoint(x, y);
        if (cell) {
          handleCellInteraction(cell.day, cell.time);
        }
      }
    },
    [isDragging, getCellFromPoint, handleCellInteraction],
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Mouse event handlers
  const handleMouseDown = useCallback(
    (day: string, time: string) => {
      handleStart(day, time);
    },
    [handleStart],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    },
    [handleMove],
  );

  const handleMouseUp = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // Touch event handlers
  const handleTouchStart = useCallback(
    (e: React.TouchEvent, day: string, time: string) => {
      e.preventDefault(); // Prevent scrolling
      handleStart(day, time);
    },
    [handleStart],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault(); // Prevent scrolling
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    },
    [handleMove],
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault(); // Prevent any default touch behavior
      handleEnd();
    },
    [handleEnd],
  );

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, []);

  // Determine cell background color based on availability types
  const getCellBackgroundColor = (day: string, time: string) => {
    const key = `${day}-${time}`;
    const cellAvailability = userAvailability[key] || {};

    // Check if any type is selected for this cell
    if (cellAvailability.available) return AVAILABILITY_TYPES.available.color;
    if (cellAvailability.leisure) return AVAILABILITY_TYPES.leisure.color;
    if (cellAvailability.busy) return AVAILABILITY_TYPES.busy.color;

    return "bg-gray-200";
  };

  return (
    <div
      className="mb-8 touch-none select-none"
      ref={gridRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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
              const key = `${day}-${time}`;
              const cellAvailability = userAvailability[key] || {};
              const isSelectedTypeActive =
                cellAvailability[selectedType] || false;

              return (
                <div
                  key={`${day}-${time}`}
                  data-key={`${day}-${time}`}
                  className={`cell cursor-pointer border p-2 transition-colors duration-150 ${getCellBackgroundColor(
                    day,
                    time,
                  )} ${isDragging ? "hover:opacity-80" : ""}`}
                  onMouseDown={() => handleMouseDown(day, time)}
                  onTouchStart={(e) => handleTouchStart(e, day, time)}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
