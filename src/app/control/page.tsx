"use client";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export default function ControlPage() {
  const seedMahasiswa = api.seed.mahasiswa.useMutation();
  const submitDbToSheets = api.backend.submitDbToSheets.useMutation();
  return (
    <div>
      <h1>Control Page</h1>
      <Button onClick={async () => await seedMahasiswa.mutateAsync()}>
        seed mahasiswas
      </Button>
      <Button onClick={async () => await submitDbToSheets.mutateAsync()}>
        submitDbToSheets
      </Button>
    </div>
  );
}
