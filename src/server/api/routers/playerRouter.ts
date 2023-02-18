import { z } from "zod";

import getPlayerStats from "../retrieveStats/loadPlayer2";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const playerRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  getPlayerStats: publicProcedure
    .input(z.object({
      season: z.string(),
      player: z.string(),
      week: z.number(),
    }))
    .query(async ({ input }) => {
      const stats = await getPlayerStats(input.season, input.player, input.week);
      return {
        stats,
      };
    }),
});