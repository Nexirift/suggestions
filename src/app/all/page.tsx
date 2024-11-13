import { Button } from '@/components/ui/button';
import { auth } from '@/server/auth';
import { api, HydrateClient } from '@/trpc/server';
import Link from 'next/link';
import { AllSuggestions } from '../_components/all-suggestions';

export default async function Admin() {
	const session = await auth();

	void api.suggestion.getAll.prefetch();

	if (!session) {
		return (
			<main className="flex min-h-screen flex-col items-center justify-center gap-2">
				<p className="text-lg font-bold">
					This page requires authentication.
				</p>
				<Button asChild>
					<Link href="/api/auth/signin">Sign in</Link>
				</Button>
			</main>
		);
	}

	return (
		<HydrateClient>
			<main className="flex min-h-screen flex-col items-center justify-center gap-4">
				<div className="text-center">
					<h1 className="text-2xl font-bold">Suggestions</h1>
					<p>
						Logged in as: <b>{session.user?.name}</b>
					</p>
				</div>
				<AllSuggestions />
			</main>
		</HydrateClient>
	);
}
