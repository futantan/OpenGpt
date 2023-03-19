import { prisma } from '@/server/db'
import { PROMPT_SECRET } from '@/utils/constants'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  if (
    req.headers.authorization === `Bearer ${PROMPT_SECRET}` &&
    req.headers.authorization !== `Bearer `
  ) {
    await prisma.openGptApp.update({
      where: { id: req.body.id },
      data: {
        usedCount: {
          increment: 1,
        },
        paidUseCount: {
          increment: req.body.isPaid ? 1 : 0,
        },
      },
    })
    return res.status(200).json({})
  } else {
    return res.status(401).end()
  }
}

export default handler
