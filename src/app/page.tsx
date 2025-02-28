import { api, HydrateClient } from "~/trpc/server";

import { Gallery } from "./_components/gallery";

export default async function HomePage() {
  const session = await api.authorization.currentSession();
  return (
    <HydrateClient>
      <main className="grid grid-cols-2 text-black">
        <div>{session && <Gallery />}</div>
        <div className="flex flex-col gap-4 border-l-4 p-4">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            title="Rick Astley - Never Gonna Give You Up"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      </main>
    </HydrateClient>
  );
}
