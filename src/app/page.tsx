import { api, HydrateClient } from "~/trpc/server";

import { Gallery } from "./_components/gallery";

export default async function HomePage() {
  const session = await api.authorization.currentSession();
  return (
    <HydrateClient>
      <main className="grid grid-cols-2 text-black">
        <div>{session && <Gallery />}</div>
        <div className="border-l-4">
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      </main>
    </HydrateClient>
  );
}
