import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
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
})
