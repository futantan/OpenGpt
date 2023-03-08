import { createAppSchema } from '@/server/api/schema'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { sendMessageToDiscord } from '@/utils/sendMessageToDiscord'
import { z } from 'zod'

export const openGptAppRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.openGptApp.findMany({
      select: { id: true, name: true, description: true, icon: true },
    })
  }),
  getById: publicProcedure.input(z.string()).query(({ input: id, ctx }) => {
    return ctx.prisma.openGptApp.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        icon: true,
        prompt: true,
        demoInput: true,
        hint: true,
      },
    })
  }),
  create: publicProcedure
    .input(createAppSchema)
    .mutation(async ({ input, ctx }) => {
      const v = await ctx.prisma.openGptApp.create({
        data: {
          name: input.name,
          description: input.description,
          icon: input.icon,
          demoInput: input.demoInput,
          prompt: input.prompt,
        },
      })

      await sendMessageToDiscord({
        id: v.id,
        name: v.name,
        description: v.description,
      })
      return v
    }),
})
