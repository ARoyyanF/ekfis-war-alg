import TimeslotPolling from "~/app/_components/timeslot-polling";
export default function Polling() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Timeslot Table Polling
      </h1>
      <p className="text-center mb-8 text-muted-foreground">
        Vote for your preferred timeslot table arrangement
      </p>
      <TimeslotPolling />
    </main>
  );
}
