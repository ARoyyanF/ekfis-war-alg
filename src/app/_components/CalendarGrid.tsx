import React, { useState, useCallback, useEffect, useRef } from "react"

interface CalendarGridProps {
  days: string[]
  times: string[]
  availability: { [key: string]: number }
  onAvailabilityChange: (day: string, time: string, isAvailable: boolean) => void
}

export default function CalendarGrid({ days, times, availability, onAvailabilityChange }: CalendarGridProps) {
  const [userAvailability, setUserAvailability] = useState<{ [key: string]: boolean }>({})
  const [isDragging, setIsDragging] = useState(false)
  const [isSelecting, setIsSelecting] = useState(true)
  const gridRef = useRef<HTMLDivElement>(null)

  const handleCellInteraction = useCallback(
    (day: string, time: string) => {
      const key = `${day}-${time}`
      const newAvailability = isSelecting
      if (userAvailability[key] !== newAvailability) {
        setUserAvailability((prev) => ({ ...prev, [key]: newAvailability }))
        onAvailabilityChange(day, time, newAvailability)
      }
    },
    [isSelecting, onAvailabilityChange, userAvailability],
  )

  const getCellFromPoint = useCallback((x: number, y: number) => {
    if (!gridRef.current) return null
    const gridRect = gridRef.current.getBoundingClientRect()
    const cells = gridRef.current.querySelectorAll(".cell")
    for (const cell of cells) {
      const rect = cell.getBoundingClientRect()
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        const [day, time] = (cell as HTMLElement).dataset.key?.split("-") || []
        return { day, time }
      }
    }
    return null
  }, [])

  const handleStart = useCallback(
    (day: string, time: string) => {
      setIsDragging(true)
      setIsSelecting(!userAvailability[`${day}-${time}`])
      handleCellInteraction(day, time)
    },
    [handleCellInteraction, userAvailability],
  )

  const handleMove = useCallback(
    (x: number, y: number) => {
      if (isDragging) {
        const cell = getCellFromPoint(x, y)
        if ((cell?.day ?? null) !== null && (cell?.time ?? null) !== null) {
            handleCellInteraction(cell.day, cell.time)
          }
      }
    },
    [isDragging, getCellFromPoint, handleCellInteraction],
  )

  const handleEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Mouse event handlers
  const handleMouseDown = useCallback(
    (day: string, time: string) => {
      handleStart(day, time)
    },
    [handleStart],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      handleMove(e.clientX, e.clientY)
    },
    [handleMove],
  )

  const handleMouseUp = useCallback(() => {
    handleEnd()
  }, [handleEnd])

  // Touch event handlers
  const handleTouchStart = useCallback(
    (e: React.TouchEvent, day: string, time: string) => {
      e.preventDefault() // Prevent scrolling
      handleStart(day, time)
    },
    [handleStart],
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault() // Prevent scrolling
      const touch = e.touches[0]
      if (touch) {
        handleMove(touch.clientX, touch.clientY)
      }
    },
    [handleMove],
  )

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault() // Prevent any default touch behavior
      handleEnd()
    },
    [handleEnd],
  )

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    window.addEventListener("mouseup", handleGlobalMouseUp)
    window.addEventListener("touchend", handleGlobalMouseUp)
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp)
      window.removeEventListener("touchend", handleGlobalMouseUp)
    }
  }, [])

  return (
    <div
      className="mb-8 select-none touch-none"
      ref={gridRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="grid grid-cols-[auto,repeat(5,1fr)] gap-1">
        <div className="font-bold">Time</div>
        {days.map((day) => (
          <div key={day} className="font-bold text-center">
            {day}
          </div>
        ))}
        {times.map((time) => (
          <React.Fragment key={time}>
            <div className="font-bold">{time}</div>
            {days.map((day) => (
              <div
                key={`${day}-${time}`}
                data-key={`${day}-${time}`}
                className={`cell border p-2 cursor-pointer transition-colors duration-150 ${
                  userAvailability[`${day}-${time}`] ? "bg-green-500" : "bg-gray-200"
                } ${isDragging ? "hover:bg-green-300" : ""}`}
                onMouseDown={() => handleMouseDown(day, time)}
                onTouchStart={(e) => handleTouchStart(e, day, time)}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

