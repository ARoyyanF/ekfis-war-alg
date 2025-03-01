"use client";
import { useAuth, useUser } from "@clerk/nextjs";

export default function TestAuth() {
  const { userId, sessionId } = useAuth();
  const { isSignedIn, user } = useUser();
  console.log(userId, sessionId, isSignedIn, user);

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
