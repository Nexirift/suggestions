'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/trpc/react';
import { useState } from 'react';

export function SubmitSuggestion() {
	const { toast } = useToast();
	const utils = api.useUtils();
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [contact, setContact] = useState('');
	const submitSuggestion = api.suggestion.submit.useMutation({
		onSuccess: async () => {
			await utils.suggestion.invalidate();
			setName('');
			setDescription('');
			toast({
				title: 'Your suggestion was submitted!',
				description:
					'We have received your suggestion and will review it shortly.'
			});
		}
	});

	return (
		<div className="w-full max-w-[360px]">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					if (name.length < 4 || description.length < 4) {
						toast({
							title: 'Please enter a valid name and description.',
							description:
								'Your suggestion must be at least 4 characters long on both name and description.'
						});
						return;
					}
					submitSuggestion.mutate({ name, description, contact });
				}}
				className="flex flex-col gap-2"
			>
				<Input
					placeholder="Give us a brief title for your suggestion."
					value={name}
					minLength={4}
					maxLength={256}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<Textarea
					placeholder="Now, provide as much detail as you can."
					value={description}
					minLength={4}
					maxLength={512}
					onChange={(e) => setDescription(e.target.value)}
					required
				/>
				<Input
					placeholder="Provide your contact information (optional)"
					value={contact}
					minLength={4}
					maxLength={256}
					onChange={(e) => setContact(e.target.value)}
				/>
				<Button type="submit" disabled={submitSuggestion.isPending}>
					{submitSuggestion.isPending ? 'Submitting...' : 'Submit'}
				</Button>
				<small className="text-sm text-center text-muted-foreground">
					If contact information has been provided, we may reach out
					to you. Please do not use your phone number.
				</small>
			</form>
		</div>
	);
}
