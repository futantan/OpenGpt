import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.SERVER_SECRET) {
    console.log('revalidate failed, invalid token =========')
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    // for now it's only home page
    console.log('revalidating home==========')
    await res.revalidate('/')
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}

export default handler
