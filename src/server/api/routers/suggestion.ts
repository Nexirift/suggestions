import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { suggestions } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const suggestionRouter = createTRPCRouter({
  submit: publicProcedure
    .input(
      z.object({
        name: z.string().min(4).max(256),
        description: z.string().min(4).max(512),
        contact: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(suggestions).values({
        name: input.name,
        description: input.description,
        contact: input.contact,
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const suggestions = await ctx.db.query.suggestions.findMany({
      orderBy: (suggestions, { desc }) => [desc(suggestions.createdAt)],
    });

    return suggestions ?? null;
  }),

  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(suggestions).where(eq(suggestions.id, input.id));
    }),
});
