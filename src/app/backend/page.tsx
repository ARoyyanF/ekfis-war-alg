"use client";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export default function Home() {
  const seedMahasiswa = api.seed.mahasiswa.useMutation();
  const submitDbToSheets = api.backend.submitDbToSheets.useMutation();
  return (
    <div>
      <Button onClick={async () => await submitDbToSheets.mutateAsync()}>
        submitDbToSheets
      </Button>
      <Button onClick={async () => await seedMahasiswa.mutateAsync()}>
        seed mahasiswas
      </Button>
    </div>
  );
}
