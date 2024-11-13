import { Button } from '@/components/ui/button';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription
} from '@/components/ui/card';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogClose,
	DialogFooter
} from '@/components/ui/dialog';
import {
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent
} from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/trpc/react';
import { X, ChevronDown, ChevronUp, Contact, Info } from 'lucide-react';
import { useState } from 'react';

export function Suggestion({
	suggestion,
	refetch
}: {
	suggestion: {
		id: string;
		name: string;
		description: string;
		contact: string | null;
	};
	refetch: () => void;
}) {
	const { toast } = useToast();

	const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
	const [isContactOpen, setIsContactOpen] = useState(false);

	const removeSuggestion = api.suggestion.remove.useMutation({
		onSuccess: () => {
			refetch();
			toast({
				title: 'Suggestion deleted!',
				description: 'The suggestion has been deleted permanently.',
				variant: 'destructive'
			});
		}
	});

	return (
		<Card key={suggestion.id} className="text-left">
			<CardHeader>
				<CardTitle className="flex justify-between">
					<h1>{suggestion.name}</h1>
					<Dialog>
						<DialogTrigger>
							<X className="h-4 w-4" />
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Are you sure?</DialogTitle>
								<DialogDescription>
									This action cannot be undone. The suggestion
									will be <b>permanently</b> deleted and{' '}
									<b>cannot</b> be recovered.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<DialogClose asChild>
									<Button
										variant="outline"
										onClick={() =>
											removeSuggestion.mutate({
												id: suggestion.id
											})
										}
									>
										Delete
									</Button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</CardTitle>
				<CardDescription className="whitespace-pre-wrap">
					<Collapsible
						open={isDescriptionOpen}
						onOpenChange={setIsDescriptionOpen}
					>
						<CollapsibleTrigger className="text-sm text-left text-muted-foreground flex justify-between w-full items-center">
							<div className="flex items-center">
								<Info className="h-4 w-4" /> View suggestion
								description.
							</div>
							{isDescriptionOpen ? (
								<ChevronUp className="h-4 w-4" />
							) : (
								<ChevronDown className="h-4 w-4" />
							)}
						</CollapsibleTrigger>
						<CollapsibleContent className="text-sm text-left text-muted-foreground">
							{suggestion.description}
						</CollapsibleContent>
					</Collapsible>
					{suggestion.contact && (
						<Collapsible
							className="pt-1"
							open={isContactOpen}
							onOpenChange={setIsContactOpen}
						>
							<CollapsibleTrigger className="text-sm text-left text-muted-foreground flex justify-between w-full items-center">
								<div className="flex items-center">
									<Contact className="h-4 w-4" /> View contact
									information.
								</div>
								{isContactOpen ? (
									<ChevronUp className="h-4 w-4" />
								) : (
									<ChevronDown className="h-4 w-4" />
								)}
							</CollapsibleTrigger>
							<CollapsibleContent className="text-sm text-left text-muted-foreground">
								{suggestion.contact}
							</CollapsibleContent>
						</Collapsible>
					)}
				</CardDescription>
			</CardHeader>
		</Card>
	);
}
