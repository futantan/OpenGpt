import { createAppSchema } from '@/server/api/schema'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { revalidateHome } from '@/utils/revalidateHome'
import { sendMessageToDiscord } from '@/utils/sendMessageToDiscord'
import { z } from 'zod'

export const openGptAppRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.openGptApp.findMany({
      select: { id: true, name: true, description: true, icon: true },
      // if shouldHide is true, it will be sorted to the end
      orderBy: [{ shouldHide: 'asc' }, { usedCount: 'desc' }],
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
        demoInput: true,
        hint: true,
      },
    })
  }),
  getTopNAppIds: publicProcedure
    .input(z.number())
    .query(({ input: count, ctx }) => {
      return ctx.prisma.openGptApp.findMany({
        orderBy: {
          usedCount: 'desc',
        },
        take: count,
        select: {
          id: true,
        },
      })
    }),
  incUsage: publicProcedure
    .input(z.string())
    .mutation(async ({ input: appId, ctx }) => {
      return ctx.prisma.openGptApp.update({
        where: { id: appId },
        data: {
          usedCount: {
            increment: 1,
          },
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

      // no need to wait
      revalidateHome()
      return v
    }),
})
