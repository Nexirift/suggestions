'use client';

import { api } from '@/trpc/react';
import Link from 'next/link';
import { Suggestion } from './suggestion';

export function AllSuggestions() {
	const allSuggestions = api.suggestion.getAll.useQuery();

	return (
		<div className="max-w-ws flex w-[25%] flex-col gap-2 text-center">
			{allSuggestions?.data && allSuggestions.data.length > 0 ? (
				allSuggestions.data?.map((suggestion) => (
					<Suggestion
						key={suggestion.id}
						suggestion={suggestion}
						refetch={allSuggestions.refetch}
					/>
				))
			) : (
				<>
					<h1 className="text-lg">
						There are currently no suggestions.
					</h1>
					<Link href="/" className="text-blue-500">
						Maybe you should make one?
					</Link>
				</>
			)}
		</div>
	);
}
