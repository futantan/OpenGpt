import { RATE_LIMIT_COUNT } from '@/utils/constants'
import { validateLicenseKey } from '@/utils/lemon'
import { GenerateApiInput } from '@/utils/types'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { isDev } from './utils/isDev'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(RATE_LIMIT_COUNT, '1 d'),
  analytics: true, // <- Enable analytics
})

export const config = {
  matcher: '/api/generate',
}

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent
): Promise<Response | undefined> {
  const { userKey } = (await request.json()) as GenerateApiInput

  if (userKey) {
    console.log('user is using license key')
    const { isValid } = await validateLicenseKey(userKey)
    if (!isValid) {
      return runOutOfRatelimit(439)
    }
    return NextResponse.next()
  }

  if (isDev) {
    return NextResponse.next()
  }

  // 👇 below only works for production

  const ipIdentifier = request.ip ?? '127.0.0.1'
  console.log('ip is trying to use ->', ipIdentifier)
  const { success, limit, reset, remaining, pending } = await ratelimit.limit(
    `ratelimit_middleware_${ipIdentifier}`
  )
  event.waitUntil(pending)

  console.log(`ip free user ${ipIdentifier}, remaining: ${remaining}`)
  if (!success) {
    return runOutOfRatelimit(429)
  } else {
    const res = NextResponse.next()
    res.headers.set('X-RateLimit-Limit', limit.toString())
    res.headers.set('X-RateLimit-Remaining', remaining.toString())
    res.headers.set('X-RateLimit-Reset', reset.toString())

    return res
  }
}

function runOutOfRatelimit(errorCode: number) {
  return new NextResponse(JSON.stringify({ success: false, message: '' }), {
    status: errorCode,
    headers: { 'content-type': 'application/json' },
  })
}
