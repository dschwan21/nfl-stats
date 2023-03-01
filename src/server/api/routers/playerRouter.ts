import { z } from "zod";

import getPlayerStats from "../retrieveStats/loadPlayer2";
import getPlayerInfo from "../retrieveStats/loadPlayerInfo";

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

  getPlayerStats: publicProcedure
    .input(z.object({
      season: z.number(),
      player: z.string(),
      week: z.number(),
    }))
    .query(async ({ input }) => {
      const stats = await getPlayerStats(input.season, input.player, input.week);
      return {
        stats,
      };
    }),

    getPlayerInfo: publicProcedure
    .query(async () => {
      const info = await getPlayerInfo();
      return {
        info,
      };
    }),
});