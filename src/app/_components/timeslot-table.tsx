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
                  <TableCell key={`${day}-${time}`} className={`text-center`}>
                    {group ? `Kel. ${group}` : "-"}
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
