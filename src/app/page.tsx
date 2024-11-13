import { SubmitSuggestion } from "@/app/_components/submit-suggestion";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-2 px-4 py-16">
          <h1 className="text-2xl font-extrabold tracking-tight">
            Nexirift Suggestions
          </h1>
          <p>Suggest ideas and features for Nexirift!</p>
          <SubmitSuggestion />
        </div>
      </main>
    </HydrateClient>
  );
}
