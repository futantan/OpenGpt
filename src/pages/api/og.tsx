import { Logo } from '@/components/Logo'
import { ImageResponse } from '@vercel/og'
import { NextApiHandler } from 'next'

export const config = {
  runtime: 'edge',
}

// Make sure the font exists in the specified path:
const font = fetch(
  new URL('../../../public/assets/DingTalk-JinBuTi.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

const handler: NextApiHandler = async (req) => {
  const fontData = await font

  try {
    const { searchParams } = new URL(req.url as string)

    // dynamic params
    const title = searchParams.has('name')
      ? searchParams.get('name')?.slice(0, 10)
      : 'App Name'

    const icon = searchParams.has('icon')
      ? searchParams.get('icon')?.slice(0, 10)
      : ''

    return new ImageResponse(
      (
        <div
          style={{
            fontFamily: '"Jinbu"',
            backgroundColor: '#ffffff',
            backgroundImage:
              'linear-gradient(180deg, #ffffff 0%, #2463eb 100%)',
          }}
          tw="h-full w-full flex items-start justify-start"
        >
          <div tw="flex items-start justify-start h-full">
            <div tw="flex flex-col justify-between w-full h-full p-20">
              <Logo />

              <div tw="flex flex-col  items-center justify-center">
                <div tw="mx-auto flex h-36 w-36 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-5xl mb-20">
                  {icon}
                </div>
                <h1 tw="text-[60px] text-white font-bold text-center">
                  {title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 627,
        emoji: 'twemoji',
        fonts: [
          {
            name: 'Jinbu',
            data: fontData,
            style: 'normal',
          },
        ],
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}

export default handler
