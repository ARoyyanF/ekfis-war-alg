import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

type TimeslotData = {
  [day: string]: {
    [time: string]: number | null;
  };
};

interface TimeslotTableProps {
  slots: TimeslotData;
}

export default function TimeslotTable({ slots }: TimeslotTableProps) {
  const days = Object.keys(slots);
  const times = Object.keys(slots[days[0]]).sort();

  // Group color mapping
  const groupColors: Record<number, string> = {
    1: "bg-blue-100 dark:bg-blue-950",
    2: "bg-amber-100 dark:bg-amber-950",
  };

  return (
    <div className="overflow-x-auto">
      <Table className="border-collapse">
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Time</TableHead>
            {days.map((day) => (
              <TableHead key={day} className="font-bold text-center">
                {day}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {times.map((time) => (
            <TableRow key={time}>
              <TableCell className="font-medium">{time}</TableCell>
              {days.map((day) => {
                const group = slots[day][time];
                return (
                  <TableCell
                    key={`${day}-${time}`}
                    className={`text-center ${group ? groupColors[group] : ""}`}
                  >
                    {group ? `Group ${group}` : "-"}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
