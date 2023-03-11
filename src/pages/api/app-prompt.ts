import { prisma } from '@/server/db'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  if (
    req.headers.authorization === `Bearer ${process.env.PROMPT_SECRET}` &&
    req.headers.authorization !== `Bearer `
  ) {
    const app = await prisma.openGptApp.findUnique({
      where: { id: req.body.id },
      select: { prompt: true },
    })
    if (!app) {
      return res.status(400).end()
    } else {
      return res.status(200).json({ prompt: app.prompt })
    }
  } else {
    return res.status(401).end()
  }
}

export default handler
